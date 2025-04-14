import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.image('room', 'assets/backgrounds/room.png');
    this.load.image('flower', 'assets/symbols/flower.png');
  }

  create() {
    this.scene.start('MenuScene');
  }
}