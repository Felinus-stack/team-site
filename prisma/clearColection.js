const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    // Znalezienie wszystkich dokumentów, gdzie bolidName to "RT11b"
    const teamMembers = await prisma.teamMember.findMany({
      where: {
        roles: {
          some: {
            bolidName: "RT11b",
          },
        },
      },
    });

    // Aktualizacja wartości bolidName na "RT11"
    for (const member of teamMembers) {
      const updatedMember = await prisma.teamMember.update({
        where: { id: member.id },
        data: {
          roles: {
            set: member.roles.map((role) => {
              if (role.bolidName === "RT11b") {
                role.bolidName = "RT11";
              }
              return role;
            }),
          },
        },
      });
      console.log(`Updated member: ${updatedMember.id}`);
    }
  } catch (error) {
    console.error("Wystąpił błąd:", error);
  } finally {
    // Rozłączenie z bazą danych
    await prisma.$disconnect();
  }
}

main();

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// async function main() {
//   // Usunięcie wszystkich wpisów z kolekcji TeamMember
//   const deleteTeamMembers = await prisma.teamMember.deleteMany({});
//   console.log(`Deleted ${deleteTeamMembers.count} team members.`);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
