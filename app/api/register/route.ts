import bcrypt from 'bcrypt';

import prisma from "@/app/libs/prismadb"
import { NextResponse } from 'next/server';

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();
    const emailRaw = body?.email;
    const name = body?.name;
    const password = body?.password;

    if (!emailRaw || !password) {
      return NextResponse.json({ message: '缺少邮箱或密码' }, { status: 400 });
    }

    const email = String(emailRaw).trim().toLowerCase();

    const existing = await prisma.admin.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ message: '邮箱已存在' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await prisma.admin.create({
      data: { email, name, hashedPassword },
    });

    return NextResponse.json(
      { id: admin.id, email: admin.email, name: admin.name, image: admin.image },
      { status: 201 }
    );
  } catch (e: any) {
    if (e?.code === 'P2002') {
      return NextResponse.json({ message: '邮箱唯一约束冲突' }, { status: 409 });
    }
    return NextResponse.json({ message: '服务器错误' }, { status: 500 });
  }
}
