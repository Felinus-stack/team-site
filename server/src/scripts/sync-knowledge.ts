import { prisma } from "../lib/prisma";
import { synchronizeKnowledge } from "../lib/agent";

const main = async (): Promise<void> => {
  const count = await synchronizeKnowledge();
  console.log(`Synchronized ${count} knowledge chunks to Qdrant.`);
};

main()
  .catch((error: unknown) => {
    console.error("Knowledge synchronization failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
