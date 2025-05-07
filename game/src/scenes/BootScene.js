import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.image('menu-bg', 'assets/backgrounds/menu-bg.png');
    //this.load.audio('menu-music', 'assets/audio/menu-music.mp3');
    this.load.image('room', 'assets/backgrounds/room.png');
    this.load.image('flower', 'assets/images/flower.png');
    this.load.image('frame', 'assets/images/frame.png');
    this.load.image('book', 'assets/images/book.png');
  }

  create() {
    // Initialisation des variables globales
    this.registry.set('souvenirScore', 0);
    this.registry.set('lienPNJ', 0);
    this.registry.set('ancragePasse', 0);
  
    this.scene.start('MenuScene');
  }
}