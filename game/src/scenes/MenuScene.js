import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    // Tous les assets à charger AVANT le menu
    this.load.image('menu-bg', 'assets/backgrounds/menu-bg.png');
    this.load.image('room', 'assets/backgrounds/room.png');
    this.load.image('flower', 'assets/images/flower.png');
    this.load.image('frame', 'assets/images/frame.png');
    this.load.image('book', 'assets/images/book.png');
    this.load.image('flower_glow', 'assets/images/flower_glow.png');
    this.load.image('icon_examine', 'assets/images/icon_examine.png');
    this.load.image('icon_smell', 'assets/images/icon_smell.png');
    this.load.image('icon_ignore', 'assets/images/icon_ignore.png');
    this.load.image('cursor', 'assets/images/arrow.png');
    this.load.image('cursor_hover', 'assets/images/arrow_hover.png');
  
    // this.load.audio('ambience', 'assets/audio/ambience_room.mp3');
    // this.load.audio('menu-music', 'assets/audio/menu-music.mp3');
  }

  create() {
    // Initialisation des scores 
    this.registry.set('souvenirScore', 0);
    this.registry.set('lienPNJ', 0);
    this.registry.set('ancragePasse', 0);

    // Fond d'écran
    this.add.image(512, 384, 'menu-bg').setOrigin(0.5);

    // Curseur
    this.input.setDefaultCursor('url(assets/images/arrow.png), pointer');

    // Musique d'ambiance (ne pas relancer si déjà jouée)
    /*if (!this.sound.get('menu-music')) {
      const music = this.sound.add('menu-music', {
        volume: 0.2,
        loop: true
      });
      music.play();
    }*/

    // Titre du jeu
    this.add.text(512, 128, 'Périphérie', {
      fontSize: '48px',
      fill: '#ffffff',
      fontFamily: 'serif'
    }).setOrigin(0.5);

    // Bouton "Commencer"
    const startButton = this.add.text(512, 434, 'Commencer', {
      fontSize: '24px',
      fill: '#dddddd',
      backgroundColor: '#444',
      padding: { x: 20, y: 10 }
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });

    // Bouton "How to play"
    const helpButton = this.add.text(512, 504, 'Comment jouer', {
      fontSize: '24px',
      fill: '#dddddd',
      backgroundColor: '#444',
      padding: { x: 20, y: 10 }
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });
    
    helpButton.on('pointerover', () => {
      this.input.setDefaultCursor('url(assets/images/arrow_hover.png), pointer');
      helpButton.setStyle({ fill: '#ffffff', backgroundColor: '#555' });
    });
    
    helpButton.on('pointerout', () => {
      this.input.setDefaultCursor('url(assets/images/arrow.png), pointer');
      helpButton.setStyle({ fill: '#dddddd', backgroundColor: '#444' });
    });
    
    helpButton.on('pointerdown', () => {
      this.cameras.main.fadeOut(800, 0, 0, 0);
      this.time.delayedCall(800, () => {
      this.scene.start('HelpScene');
      })
    });

    startButton.on('pointerover', () => {
      this.input.setDefaultCursor('url(assets/images/arrow_hover.png), pointer');
      startButton.setStyle({ fill: '#ffffff', backgroundColor: '#555' });
    });

    startButton.on('pointerout', () => {
      this.input.setDefaultCursor('url(assets/images/arrow.png), pointer');
      startButton.setStyle({ fill: '#dddddd', backgroundColor: '#444' });
    });

    startButton.on('pointerdown', () => {
      this.cameras.main.fadeOut(800, 0, 0, 0);
      this.time.delayedCall(800, () => {
      
        this.scene.start('RoomScene');
        // this.scene.launch('RoomScene'); --> Si preload supprimé de RoomScene
      })
    });

    this.cameras.main.fadeIn(1000, 0, 0, 0);
  }
}