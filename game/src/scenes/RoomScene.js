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
    const flower = this.add.image(600, 400, 'flower').setScale(0.5).setInteractive();

    // Texte pour feedback utilisateur
    const feedbackText = this.add.text(600, 350, '', {
      fontSize: '18px',
      fill: '#ffffff'
    }).setOrigin(0.5).setAlpha(0);

    // Interaction sur la fleur
    flower.on('pointerdown', () => {
      // Effet de scale rapide (animation légère)
      this.tweens.add({
        targets: flower,
        scale: 0.6,
        yoyo: true,
        duration: 150
      });

      // Incrémente la variable souvenirScore
      GameState.souvenirScore += 1;

      // Affiche le texte temporairement
      feedbackText.setText(`Souvenir +1`).setAlpha(1);
      this.time.delayedCall(1000, () => {
        feedbackText.setAlpha(0);
      });

      console.log('souvenirScore:', GameState.souvenirScore); // Debug
    });
  }
}