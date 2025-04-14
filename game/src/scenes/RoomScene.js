import Phaser from 'phaser';
import GameState from '../data/GameState';

export default class RoomScene extends Phaser.Scene {
  constructor() {
    super('RoomScene');
  }

  create() {
// Affiche le décor de la pièce
this.add.image(400, 300, 'room').setOrigin(0.5, 0.5);

// Ajoute la fleur avec interactivité
const flower = this.add.image(600, 400, 'flower')
  .setScale(0.5)
  .setInteractive({ useHandCursor: true });

// Texte pour feedback utilisateur
const feedbackText = this.add.text(600, 350, '', {
  fontSize: '18px',
  fill: '#ffffff'
}).setOrigin(0.5).setAlpha(0);

// Score total en haut à gauche
const scoreText = this.add.text(20, 20, `Souvenirs : ${GameState.souvenirScore}`, {
  fontSize: '20px',
  fill: '#ffffff'
});

// Interaction sur la fleur
  flower.on('pointerdown', () => {
    // Animation de la fleur
    this.tweens.add({
      targets: flower,
      scale: 0.6,
      yoyo: true,
      duration: 150
    });

    // Incrémente le score
    GameState.souvenirScore += 1;
    scoreText.setText(`Souvenirs : ${GameState.souvenirScore}`);

    // Création d’un texte temporaire pour le +1
    const tempText = this.add.text(flower.x, flower.y - 50, '+1 souvenir', {
      fontSize: '18px',
      fill: '#ffffff'
    }).setOrigin(0.5).setAlpha(1);

    // Animation du texte (monte et disparaît)
    this.tweens.add({
      targets: tempText,
      y: tempText.y - 30,
      alpha: 0,
      duration: 1000,
      ease: 'Power1',
      onComplete: () => {
        tempText.destroy(); // Nettoyage après animation
      }
    });

    console.log('souvenirScore:', GameState.souvenirScore);
    });
  }
}
