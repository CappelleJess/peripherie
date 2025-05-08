import Phaser from 'phaser';
import GameState from '../data/GameState';
import { createMemoryObject } from './createMemoryObject';

export default class RoomScene extends Phaser.Scene {
  constructor() {
    super('RoomScene');
  }

  preload() {
    this.load.image('flower', 'assets/images/flower.png');
    this.load.image('flower_glow', 'assets/images/flower_glow.png');
    this.load.image('icon_examine', 'assets/images/icon_examine.png');
    this.load.image('icon_smell', 'assets/images/icon_smell.png');
    this.load.image('icon_ignore', 'assets/images/icon_ignore.png');
  }

  create() {
    this.add.image(400, 300, 'room').setOrigin(0.5);

    this.souvenirText = this.add.text(20, 20, `Souvenirs : ${GameState.souvenirScore}`, {
      fontSize: '20px',
      fill: '#ffffff'
    });

    this.ancrageText = this.add.text(20, 50, `Ancrage : ${GameState.ancragePasse}`, {
      fontSize: '20px',
      fill: '#ffffff'
    });

    this.nostalgieText = this.add.text(20, 80, `Nostalgie : ${GameState.emergenceNostalgie}`, {
      fontSize: '20px',
      fill: '#ffffff'
    });

    // Création d'un objet mémoire générique : flower
    createMemoryObject(this, {
      key: 'flower',
      sprite: 'flower',
      x: 600,
      y: 400,
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
    });
  }

  update() {
    if (this.memoryObjects) {
      this.memoryObjects.forEach(({ object, halo }) => {
        if (halo) {
          halo.x = object.x;
          halo.y = object.y;
        }
      });
    }
  }

  updateScoreDisplay() {
    this.souvenirText.setText(`Souvenirs : ${GameState.souvenirScore}`);
    this.ancrageText.setText(`Ancrage : ${GameState.ancragePasse}`);
    this.nostalgieText.setText(`Nostalgie : ${GameState.emergenceNostalgie}`);
  }
} 