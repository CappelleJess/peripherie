import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene';
import HelpScene from './scenes/HelpScene';
import RoomScene from './scenes/RoomScene';

// Configuration du jeu
const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  scene: [MenuScene, HelpScene, RoomScene],
  pixelArt: true,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};

// Création du jeu
const game = new Phaser.Game(config);