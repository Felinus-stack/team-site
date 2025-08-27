const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
// Find all documents where projectName is "RT11b"
    const teamMembers = await prisma.teamMember.findMany({
      where: {
        roles: {
          some: {
            projectName: "RT11b",
          },
        },
      },
    });

    // Update projectName value to "RT11"
    for (const member of teamMembers) {
      const updatedMember = await prisma.teamMember.update({
        where: { id: member.id },
        data: {
          roles: {
            set: member.roles.map((role) => {
              if (role.projectName === "RT11b") {
                role.projectName = "RT11";
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
