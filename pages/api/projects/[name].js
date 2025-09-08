import prisma from "@/app/libs/prismadb";
import { getEnglishFileName } from "@/app/utils/projectMapping";

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
      const englishPath = project.englishPath || getEnglishFileName(project.name);
      const responseData = {
        ...project,
        short_description: project.shortDescription,
        EN_short_description: project.enShortDescription,
        EN_name: project.enName,
        // 使用数据库中的英文路径或回退到映射
        imagePath: `/images/projects/${englishPath}/${englishPath}.png`,
      };
      res.status(200).json(responseData);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
