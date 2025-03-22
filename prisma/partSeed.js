const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const partsToAdd = [
    {
      partName: "aerodynamics",
      description:
        "Pakiet aerodynamiczny wykonany z włókna węglowego, został w całości zaprojektowany i wykonany przez PWR Racing Team we własnym warsztacie. Główne zadanie elementów aerodynamicznych to redukcja oporów powietrza pojazdu oraz zapewnienie docisku, co zwiększa stabilność podczas przyspieszania oraz gwarantuje zwiększoną przyczepność podczas zakrętów. Masa całego pakietu aerodynamicznego wynosi zaledwie 9,5kg, co czyni go jednym z najlżejszych w całej Formule Student. Ważnymi elementami są również kanały chłodzące baterię i przedni układ hamulcowy, dzięki czemu maksymalizują one wydajność układu chłodzenia w każdych warunkach.",
    },
    {
      partName: "powertrain",
      description:
        "Po 11 latach korzystania z silników spalinowych nadszedł czas na zbudowanie elektrycznego układu napędowego. Zaprojektowano i wykonano dwa silniki elektryczne z magnesami trwałymi, o mocy 47kW każdy i maksymalnej prędkości obrotowej wynoszącej 15 000 RPM. Dodatkowo stworzona została autorska przekładnia planetarna o stałym przełożeniu 9,8. PWR Racing Team, również samodzielnie wykonał baterię złożoną z 484 ogniw w konfiguracji 121S4P, pojemności 8,5kWh i napięciu maksymalnym 510V.",
    },
    {
      partName: "suspension",
      description:
        "W związku z konstrukcją pierwszego bolidu elektrycznego z systemami jazdy autonomicznej kompletnie przeprojektowaliśmy zawieszenie, aby jak najlepiej zaadaptować je do nowego projektu. Zwrotnice wraz z piastami zostały przystosowane do przekładni planetarnych oraz montażu silników bezpośrednio przy kole. Układ kierowniczy zyskał dodatkowy mechanizm, przenoszący moment z silnika, który skręca bolidem podczas konkurencji autonomicznych. W przypadku gdy kontrolę nad bolidem przejmuje kierowca, silnik układu kierowniczego jest rozpinany za pomocą sprzęgła elektromagnetycznego. Przystosowaliśmy również system mocowania pedaliery z szynami, dzięki któremu posiadamy szybką możliwość regulacji ustawień pod konkretnego kierowcę. Przednie, autorskie zaciski bolidu posiadają różną średnicę tłoczków, aby zapewnić jednakowe zużycie okładzin klocków hamulcowych.",
    },
    {
      partName: "electronics",
      description:
        "RT12e został wyposażony w modularną wiązkę elektryczną liskiego i wysokiego napięcia, która została wykonana w militarnym standardzie MILSTDD810H i posiada 2 oddzielne magistrale CAN. Łączna długość przewodów to ponad 350 metrów, a w wiązce zastosowano koncentryczne skręcanie, dzięki któremu utrzymane zostały małe promienie gięcia przewodów, które są niezbędne w motorsporcie. Dodatkowo dzięki zaawansowanemu modelowaniu 3D, została ona zoptymalizowana, a średnice przewodów zmniejszono, co czyni ją najlżejszą w swojej klasie. RT12e został wyposażony w autorski system telemetrii opartej na 900MHz. Dzięki wsparciu firmy Speedgoat bolid został wyposażony w komputer Baseline Real-Time Target Machine, który obsługuje sieć ponad 100 czujników znajdujących się na aucie. Główne jego zadanie to kontrola działania inwerterów oraz połączenie wszystkich magistrali komunikacyjnych w RT12e umożliwiając łączność z głównym komputerem systemu autonomicznego.",
    },
    {
      partName: "chassis",
      description:
        "Struktura nośna RT12e w tym roku została zupełnie przeprojektowana na pierwszy pełny monocoque. Ważąca zaledwie 24 kg struktura nośna została w całości wykonana z włókna węglowego z aluminiowym rdzeniem o strukturze plastra miodu. Wnętrze kokpitu zostało zaprojektowane i wykonane z dbałością o wygodę i ergonomię kierowcy, a fotel z włókna węglowego został dopasowany do kształtu pleców kierowcy, co zapewnia stabilną pozycję, nawet przy dużych przeciążeniach.",
    },
    {
      partName: "autonomy",
      description:
        "Dział autonomy, powstał specjalnie na potrzeby projektu RT12e i od podstaw stworzył systemy jazdy autonomicznej. Bazujący na 2 kamerach stereoskopowych i 16 wiązkowym czujniku LiDAR system percepcji pozwala na wykrywanie pachołków i wyznaczanie toru jazdy. Komunikacja oparta jest na wzorcu see-think-act, a estymacja ruchu odbywa się na podstawie algorytmu SLAM.",
    },
    {
      partName: "vehicle performance",
      description:
        "Interdyscyplinarny projekt Vehicle Performance powstał w celu długofalowego rozwoju. Zaprojektowano od podstaw oprogramowanie sterujące dynamiką pojazdu, dzięki czemu bolid po raz pierwszy posiada systemy zwiększające osiągi samochodu takie jak Torque Vectoring czy Traction Control. Przeprowadzone zostały również symulacje wybranych konkurencji dynamicznych występujących podczas zawodów Formuły Student takich jak Skidpad czy Acceleration. Symulacje bazują na modelu matematycznym pojazdu, dzięki czemu już w fazie designu istnieje możliwość oszacowania, jak bolid będzie zachowywał się w rzeczywistości.",
    },
  ];

  const bolid = await prisma.bolid.findUnique({
    where: {
      name: "RT12e",
    },
  });

  if (bolid) {
    const updateBolid = await prisma.bolid.update({
      where: {
        id: bolid.id, // Zmienione z name na id, ale w twoim przypadku możesz użyć `name: "RT12e"`
      },
      data: {
        parts: {
          push: partsToAdd, // Użycie 'push' zamiast 'create'
        },
      },
    });

    console.log(`Parts added to bolid: ${updateBolid.name}`);
  } else {
    console.log('Bolid "RT12e" not found');
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
