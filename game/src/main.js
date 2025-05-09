import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene';
import HelpScene from './scenes/HelpScene';
import RoomScene from './scenes/RoomScene';

// Configuration du jeu
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  scene: [MenuScene, HelpScene, RoomScene]
};

// Création du jeu
const game = new Phaser.Game(config);