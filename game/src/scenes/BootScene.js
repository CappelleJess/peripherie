import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.image('menu-bg', 'assets/backgrounds/menu-bg.png');
    this.load.audio('menu-music', 'assets/musics/menu-music.mp3');
    this.load.image('room', 'assets/backgrounds/room-bg.png');
    this.load.image('flower', 'assets/symbols/flower.png');
  }

  create() {
    // Initialisation des variables globales
    this.registry.set('souvenirScore', 0);
    this.registry.set('lienPNJ', 0);
    this.registry.set('ancragePasse', 0);
  
    this.scene.start('MenuScene');
  }
}