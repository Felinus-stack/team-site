import prisma from "@/app/libs/prismadb";

export default async function handler(req, res) {
  const { name } = req.query;

  try {
    const project = await prisma.project.findFirst({
      where: {
        name,
      },
    });

    if (project) {
      // 转换字段名以匹配前端期望的格式
      const responseData = {
        ...project,
        short_description: project.shortDescription,
        EN_short_description: project.enShortDescription,
        EN_name: project.enName,
      };
      res.status(200).json(responseData);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
