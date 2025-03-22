const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Usuwanie wszystkich wpisów z kolekcji 'news'
  const deleteResult = await prisma.news.deleteMany({});
  console.log(`Usunięto ${deleteResult.count} wpisów z newsów.`); // Informacja o liczbie usuniętych rekordów
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); // Zawsze pamiętaj o zamknięciu połączenia z bazą
  });
