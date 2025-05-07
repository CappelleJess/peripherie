// RoomScene.js
import Phaser from 'phaser';
import GameState from '../data/GameState';
import { createFlower, createFrame, createBook } from './interactiveObjects';
import { showFlowerDialogue } from './dialogues';

export default class RoomScene extends Phaser.Scene {
  constructor() {
    super('RoomScene');
  }

  // Chargement des assets (icônes)
  preload() {
    this.load.image('icon_examine', 'assets/images/icon_examine.png');
    this.load.image('icon_smell', 'assets/images/icon_smell.png');
    this.load.image('icon_ignore', 'assets/images/icon_ignore.png');
  }

  create() {
    // Affiche le décor de la pièce
    this.add.image(400, 300, 'room').setOrigin(0.5, 0.5);

    // Création des textes pour les scores
    const souvenirText = this.add.text(20, 20, `Souvenirs : ${GameState.souvenirScore}`, {
      fontSize: '20px',
      fill: '#ffffff'
    });

    const ancrageText = this.add.text(20, 50, `Ancrage : ${GameState.ancragePasse}`, {
      fontSize: '20px',
      fill: '#ffffff'
    });

    const nostalgieText = this.add.text(20, 80, `Nostalgie : ${GameState.emergenceNostalgie}`, {
      fontSize: '20px',
      fill: '#ffffff'
    });

    // Création des objets interactifs avec leurs interactions
    const flower = createFlower(this, 600, 400, souvenirText, ancrageText, nostalgieText);
    const frame = createFrame(this, 500, 250, souvenirText);
    const book = createBook(this, 300, 400, souvenirText);

    // Affichage de la boîte de dialogue lors du survol de la fleur
    flower.on('pointerover', () => {
      showFlowerDialogue(this, 400, 200, souvenirText, ancrageText, nostalgieText);
    });
  }

  updateScoreDisplay(souvenirText, ancrageText, nostalgieText) {
    this.tweens.add({
      targets: souvenirText,
      scale: 1.2,
      duration: 150,
      yoyo: true,
      ease: 'Power1',
      onComplete: () => {
        souvenirText.setText(`Souvenirs : ${GameState.souvenirScore}`);
      }
    });

    // Animation de l'ancrage au passé
    this.tweens.add({
      targets: ancrageText,
      scale: 1.2,
      duration: 150,
      yoyo: true,
      ease: 'Power1',
      onComplete: () => {
        ancrageText.setText(`Ancrage au passé : ${GameState.ancragePasse}`);
      }
    });

    // Animation de la nostalgie
    this.tweens.add({
      targets: nostalgieText,
      scale: 1.2,
      duration: 150,
      yoyo: true,
      ease: 'Power1',
      onComplete: () => {
        nostalgieText.setText(`Nostalgie : ${GameState.emergenceNostalgie}`);
      }
    });
  }
}