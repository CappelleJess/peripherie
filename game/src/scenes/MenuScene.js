import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    // Fond d'écran
    this.add.image(400, 300, 'menu-bg').setOrigin(0.5);

    // Musique d'ambiance (ne pas relancer si déjà jouée)
    if (!this.sound.get('menu-music')) {
      const music = this.sound.add('menu-music', {
        volume: 0.2,
        loop: true
      });
      music.play();
    }

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

    this.cameras.main.fadeIn(1000, 0, 0, 0);
  }
}