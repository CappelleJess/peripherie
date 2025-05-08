import Phaser from 'phaser';
import GameState from '../data/GameState';
import { createFlower, createFrame, createBook } from './interactiveItems';
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

    // Création des objets interactifs avec leurs interactions
    const flower = createFlower(this, 600, 400, this.souvenirText, this.ancrageText, this.nostalgieText);
    const frame = createFrame(this, 500, 250, this.souvenirText);
    const book = createBook(this, 300, 400, this.souvenirText);

    // Clique : ouvrir la boîte de dialogue complète (si pas déjà interagi)
    flower.on('pointerdown', () => {
      if (GameState.interactions.flower === null) {
        showFlowerDialogue(this, flower, this.souvenirText, this.ancrageText, this.nostalgieText);
      }
    });

    // Survol : afficher le dialogue résumé si déjà interagi
    flower.on('pointerover', () => {
      if (GameState.interactions.flower !== null) {
        showFlowerDialogue(this, flower, this.souvenirText, this.ancrageText, this.nostalgieText);
      }
    });
  }
  
  // Fonction MàJ l'affichage des scores
  updateScoreDisplay() {
    this.souvenirText.setText(`Souvenirs : ${GameState.souvenirScore}`);
    this.ancrageText.setText(`Ancrage : ${GameState.ancragePasse}`);
    this.nostalgieText.setText(`Nostalgie : ${GameState.emergenceNostalgie}`);
  }
}