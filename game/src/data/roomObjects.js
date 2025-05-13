export const memoryObjectsConfig = [
  {
    key: 'flower',
    sprite: 'flower',
    x: 512,
    y: 384,
    scale: 1,
    choices: {
      examine: {
        text: "Cette fleur te rappelle un souvenir agréable de l’époque où tout semblait plus simple.",
        scores: { souvenir: 1, ancrage: 1, nostalgie: 1 }
      },
      smell: {
        text: "L'odeur de la fleur t'envahit, apportant avec elle des souvenirs chaleureux mais lourds.",
        scores: { souvenir: 2, ancrage: 2 }
      },
      ignore: {
        text: "Tu détournes le regard, préférant éviter de raviver ce souvenir.",
        scores: { ancrage: -1 }
      }
    }
  },
  {
    key: 'frame1',
    sprite: 'frame',
    x: 300,
    y: 360,
    scale: 1,
    choices: {
      examine: {
        text: "Un cadre photo usé... Tu reconnais à peine les visages, mais une ambiance familière en émane.",
        scores: { souvenir: 2, nostalgie: 2 }
      },
      ignore: {
        text: "Tu passes devant sans t'arrêter.",
        scores: { ancrage: -2 }
      }
    }
  },
  {
    key: 'book',
    sprite: 'book',
    x: 470,
    y: 480,
    scale: 1,
    choices: {
      examine: {
        text: "Un carnet griffonné de souvenirs, d’esquisses, de mots oubliés.",
        scores: { souvenir: 3, nostalgie: 1 }
      },
      ignore: {
        text: "Tu fermes le carnet sans l’ouvrir, comme pour te protéger.",
        scores: { ancrage: -1 }
      }
    }
  }
];