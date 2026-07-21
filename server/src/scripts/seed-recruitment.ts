import { prisma } from "../lib/prisma";
import { seedRecruitmentCatalog } from "../lib/recruitment";

const main = async (): Promise<void> => {
  await seedRecruitmentCatalog();
  console.log("Recruitment questions and tasks are ready.");
};

main()
  .catch((error: unknown) => {
    console.error("Recruitment catalog initialization failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
