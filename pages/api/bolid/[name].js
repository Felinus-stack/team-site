import prisma from "@/app/libs/prismadb";

export default async function handler(req, res) {
  const { name } = req.query;

  try {
    const bolid = await prisma.bolid.findFirst({
      where: {
        name,
      },
    });

    if (bolid) {
      res.status(200).json(bolid);
    } else {
      res.status(404).json({ message: "Bolid not found" });
    }
  } catch (error) {MV
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
