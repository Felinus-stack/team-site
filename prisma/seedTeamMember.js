const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const memberToUpdate = { name: "Piotr", surname: "Osiński" };

  const existingMember = await prisma.teamMember.findFirst({
    where: {
      name: { equals: memberToUpdate.name, mode: "insensitive" },
      surname: { equals: memberToUpdate.surname, mode: "insensitive" },
    },
  });

  if (existingMember) {
    // Jeśli członek istnieje, dodaj nową rolę
    await prisma.teamMember.update({
      where: { id: existingMember.id },
      data: {
        roles: {
          push: {
            department: "Composites",
            role: "Member",
            bolidName: "RT14e",
          },
        },
      },
    });
    console.log(
      `Updated roles for ${memberToUpdate.name} ${memberToUpdate.surname}`
    );
  } else {
    // Jeśli członek nie istnieje, dodaj nowego członka zespołu z odpowiednimi danymi
    await prisma.teamMember.create({
      data: {
        name: memberToUpdate.name,
        surname: memberToUpdate.surname,
        roles: [
          {
            department: "Composites",
            role: "Member",
            bolidName: "RT14e",
          },
        ],
      },
    });
    console.log(
      `Created new team member ${memberToUpdate.name} ${memberToUpdate.surname}`
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
