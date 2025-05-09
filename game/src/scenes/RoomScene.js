import Phaser from 'phaser';
import GameState from '../data/GameState';
import { createMemoryObject } from './memoryItems';

export default class RoomScene extends Phaser.Scene {
  constructor() {
    super('RoomScene');
  }

  preload() {
    // Images
    this.load.image('background', 'assets/backgrounds/room.png');
    this.load.image('flower', 'assets/images/flower.png');
    this.load.image('flower_glow', 'assets/images/flower_glow.png');
    this.load.image('icon_examine', 'assets/images/icon_examine.png');
    this.load.image('icon_smell', 'assets/images/icon_smell.png');
    this.load.image('icon_ignore', 'assets/images/icon_ignore.png');

    // Audio
    // this.load.audio('ambience', 'assets/audio/ambience_room.mp3');
    // this.load.audio('select', 'assets/audio/memory_select.wav');

    // Curseur personnalisé
    this.load.image('cursor', 'assets/images/arrow.png');
    this.load.image('cursor_hover', 'assets/images/arrow_hover.png');
  }

  create() {
    // Apparition en fondu
    this.cameras.main.setBackgroundColor('#000000');
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    // Son d'ambiance
    // this.ambience = this.sound.add('ambience', { loop: true, volume: 0.4 });
    // this.ambience.play();

    // Curseur personnalisé
    this.input.setDefaultCursor('url(assets/images/arrow.png), pointer');

    // Fond
    this.add.image(400, 300, 'room').setOrigin(0.5);

    // Texte de score
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

    // Création objet mémoire : flower
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

    // Initialisation de la progression
    GameState.objectsInteracted = 0;
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

    // Fin du niveau après 3 interactions
    if (GameState.objectsInteracted >= 3 && !this.transitioning) {
      this.transitioning = true;
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        console.log('Fin du niveau atteinte. Transition à venir.');
        // TODO : passer à la scène suivante ou afficher une fin
      });
    }
  }

  updateScoreDisplay() {
    this.souvenirText.setText(`Souvenirs : ${GameState.souvenirScore}`);
    this.ancrageText.setText(`Ancrage : ${GameState.ancragePasse}`);
    this.nostalgieText.setText(`Nostalgie : ${GameState.emergenceNostalgie}`);
  }
} 