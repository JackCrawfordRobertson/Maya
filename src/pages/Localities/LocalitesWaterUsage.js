//LocalitesWaterUsage.js
import React from "react";

export const LocalitesWaterUsage = [
    {
        id: 1,
        name: "Ain Bourday",
        population: 1200,
        waterDemand: 180,
        averageProducedWater: 540,
        availableWaterSource: 1620,
        weSubscribers: 218,
        houseUnits: 1100,
        collectionRate: 22,
        energySources: [ "Solar", "Generator" ],
        waterDemandDesignCriteria: 150,
        solarSystemAverageHours: 6,
        availableWaterSourceYield: 18,
    },
    {
        id: 2,
        name: " Douris",
        population: 5464,
        waterDemand: 820,
        averageProducedWater: 540, // Assuming data not provided
        availableWaterSource: 1620, // Assuming data not provided
        weSubscribers: 742,
        houseUnits: 4000,
        collectionRate: 25,
        energySources: [], // Assuming data not provided
    },

    {
        id: 3,
        name: "Ali el Nahri",
        population: 17850,
        waterDemand: 2678,
        averageProducedWater: 1770, // Assuming data not provided
        availableWaterSource: 1770, // Assuming data not provided
        weSubscribers: 1156,
        houseUnits: 4599,
        collectionRate: 23,
        energySources: [ "EDL, Solar, Generator" ], // Assuming data not provided
    },
    {
        id: 4,
        name: "Riyak",
        population: 22000,
        waterDemand: 3300,
        averageProducedWater: 100, // Assuming data not provided
        availableWaterSource: 100, // Assuming data not provided
        weSubscribers: 618,
        houseUnits: 3655,
        collectionRate: 13,
        energySources: [ "EDL", "Generator" ],
    },
    {
        id: 5,
        name: "Haouch Hala",
        population: 22000, // Assuming data not provided
        waterDemand: 3300, // Assuming data not provided
        averageProducedWater:  100, // Assuming data not provided
        availableWaterSource:  100, // Assuming data not provided
        weSubscribers: 843,
        houseUnits:  100, // Assuming data not provided

        collectionRate: 12,
        energySources: [ "EDL", "Generator" ],
    },
    {
        id: 6,
        name: "Fekha",
        population: 4645,
        waterDemand: 697,
        averageProducedWater: 600,
        availableWaterSource: 800,
        weSubscribers: 544,
        houseUnits: 3562,

        collectionRate: 3,
        energySources: [ "Solar", "EDL" ],
    },

    {
        id: 7,
        name: "Khirbet Qanafar",
        population:  100,
        waterDemand:  100,
        averageProducedWater:  100,
        availableWaterSource:  100,
        weSubscribers:  100,
        houseUnits:  100,

        collectionRate:  100,
        energySources: [ "Solar", "EDL" ],
    },
    // {
    //   id: 9,
    //   name: "Jdeydih",
    //   population: 6300,
    //   waterDemand: 945,
    //   averageProducedWater: 800,
    //   availableWaterSource: 800,
    //   weSubscribers: 520,
    //   houseUnits:  100, // Assuming data not provided
    //   electricSubscribers:  100, // Assuming data not provided
    //   collectionRate: 13,
    //   energySources: ["Gravity"],
    //   waterDemandDesignCriteria:  100, // Assuming data not provided
    //   solarSystemAverageHours:  100, // Assuming data not provided
    //   availableWaterSourceYield:  100 // Assuming data not provided
    // },
    // {
    //   id: 7,
    //   name: "Zeitoun",
    //   population: 6800,
    //   waterDemand: 1020,
    //   averageProducedWater: 350,
    //   availableWaterSource: 1680,
    //   weSubscribers: 258,
    //   houseUnits:  100, // Assuming data not provided
    //   electricSubscribers:  100, // Assuming data not provided
    //   collectionRate: 1,
    //   energySources: ["Solar", "EDL", "Generator"],
    //   waterDemandDesignCriteria:  100, // Assuming data not provided
    //   solarSystemAverageHours:  100, // Assuming data not provided
    //   availableWaterSourceYield:  100 // Assuming data not provided
    // },
    {
        id: 8,
        name: "Maalqa",
        population: 6800, // Assuming data not provided
        waterDemand: 1020, // Assuming data not provided
        averageProducedWater: 350, // Assuming data not provided
        availableWaterSource: 1680, // Assuming data not provided
        weSubscribers: 117,
        houseUnits: 3562, // Assuming data not provided
        collectionRate: 2,
        energySources: [ "Solar", "EDL", "Generator" ],
    },

    {
        id: 9,
        name: "Moqraq",
        population: 1785,
        waterDemand: 268,
        averageProducedWater: 840,
        availableWaterSource: 5040,
        weSubscribers: 41,
        houseUnits: 297,
        collectionRate: 12,
        energySources: [ "Solar", "EDL", "Generator" ],
    },
    // {
    //   id: 13,
    //   name: "Amhaziyeh",
    //   population: 1800,
    //   waterDemand: 270,
    //   averageProducedWater:  100, // Assuming data not provided
    //   availableWaterSource:  100, // Assuming data not provided
    //   weSubscribers: 116,
    //   houseUnits: 300,
    //   electricSubscribers:  100, // Assuming data not provided
    //   collectionRate: 3,
    //   energySources: ["Solar", "EDL", "Generator"],
    //   waterDemandDesignCriteria:  100, // Assuming data not provided
    //   solarSystemAverageHours:  100, // Assuming data not provided
    //   availableWaterSourceYield:  100 // Assuming data not provided
    // },
    // {
    //   id: 14,
    //   name: "Noqra",
    //   population: 100,
    //   waterDemand: 15,
    //   averageProducedWater:  100, // Assuming data not provided
    //   availableWaterSource:  100, // Assuming data not provided
    //   weSubscribers: 19,
    //   houseUnits: 32,
    //   electricSubscribers:  100, // Assuming data not provided
    //   collectionRate: 37,
    //   energySources: ["Solar", "EDL", "Generator"],
    //   waterDemandDesignCriteria:  100, // Assuming data not provided
    //   solarSystemAverageHours:  100, // Assuming data not provided
    //   availableWaterSourceYield:  100 // Assuming data not provided
    // },
    {
        id: 10,
        name: "Toufiqiyeh",
        population: 6120,
        waterDemand: 918,
        averageProducedWater: 840, // Assuming data not provided
        availableWaterSource: 5040, // Assuming data not provided
        weSubscribers: 335,
        houseUnits: 1020,
        collectionRate: 11,
        energySources: [ "Solar", "EDL", "Generator" ],
    },

    {
        id: 11,
        name: "Nabi Osman",
        population: 4500,
        waterDemand: 675,
        averageProducedWater: 650,
        availableWaterSource: 1940,
        weSubscribers: 388,
        houseUnits: 1031,

        collectionRate: 8,
        energySources: [ "Solar", "EDL", "Generator" ],
    },
    {
        id: 12,
        name: "Ras Baalbek",
        population: 7650,
        waterDemand: 1148,
        averageProducedWater: 874,
        availableWaterSource: 3960,
        weSubscribers: 860,
        houseUnits: 1476,
        collectionRate: 5,
        energySources: [ "Solar", "EDL", "Generator" ],
    },
    {
        id: 13,
        name: "Laboueh",
        population:  100, // Assuming data not provided
        waterDemand:  100, // Assuming data not provided
        averageProducedWater:  100, // Assuming data not provided
        availableWaterSource:  100, // Assuming data not provided
        weSubscribers:  100, // Assuming data not provided
        houseUnits:  100, // Assuming data not provided

        collectionRate:  100, // Assuming data not provided
        energySources: [], // Assuming data not provided
    },
    {
        id: 14,
        name: "Zabboud",
        population: 1650,
        waterDemand: 248,
        averageProducedWater:  100, // Assuming data not provided
        availableWaterSource:  100, // Assuming data not provided
        weSubscribers: 292,
        houseUnits: 310,

        collectionRate: 20,
        energySources: [ "EDL", "Generator" ],
    },
    {
        id: 15,
        name: "Bejjejeh",
        population:  100,
        waterDemand:  100,
        averageProducedWater:  100, // Assuming data not provided
        availableWaterSource:  100, // Assuming data not provided
        weSubscribers:  100,
        houseUnits:  100,
        collectionRate:  100,
        energySources: [ "EDL", "Generator" ],
    },

    // ... Add the rest of the localities here in the same format
];
