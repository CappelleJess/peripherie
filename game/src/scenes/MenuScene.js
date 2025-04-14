import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    // Fond uni ou image nostalgique (optionnel)
    this.cameras.main.setBackgroundColor('#1e1e2e');

    // Titre du jeu
    this.add.text(400, 200, 'Périphérie', {
      fontSize: '48px',
      fill: '#ffffff',
      fontFamily: 'serif'
    }).setOrigin(0.5);

    // Bouton "Commencer"
    const startButton = this.add.text(400, 350, 'Commencer', {
      fontSize: '24px',
      fill: '#dddddd',
      backgroundColor: '#444',
      padding: { x: 20, y: 10 }
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });

    startButton.on('pointerover', () => {
      startButton.setStyle({ fill: '#ffffff', backgroundColor: '#555' });
    });

    startButton.on('pointerout', () => {
      startButton.setStyle({ fill: '#dddddd', backgroundColor: '#444' });
    });

    startButton.on('pointerdown', () => {
      this.scene.start('RoomScene');
    });
  }
}