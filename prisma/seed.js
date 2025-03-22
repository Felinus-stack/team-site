const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");

// Ścieżka do pliku JSON z opisami w języku angielskim
const bolidDescriptionsPath = path.join(__dirname, "bolidDescriptions.json");
const bolidDescriptions = require(bolidDescriptionsPath);

async function updateBolidDescriptions() {
  try {
    for (const [bolidName, description] of Object.entries(bolidDescriptions)) {
      // Znajdź bolid po nazwie
      const bolid = await prisma.bolid.findUnique({
        where: { name: bolidName },
      });

      if (bolid) {
        // Zaktualizuj rekord bolidu o nową zmienną EN_short_description
        await prisma.bolid.update({
          where: { name: bolidName },
          data: { EN_short_description: description },
        });
        console.log(`Updated ${bolidName} with EN_short_description`);
      } else {
        console.log(`Bolid ${bolidName} not found`);
      }
    }
  } catch (error) {
    console.error("Error updating bolid descriptions:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateBolidDescriptions();
