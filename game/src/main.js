import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import MenuScene from './scenes/MenuScene';
import RoomScene from './scenes/RoomScene';

// Configuration du jeu
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [BootScene, MenuScene, RoomScene]
};

// Création du jeu
const game = new Phaser.Game(config);

// Fonction de préchargement des assets
function preload() {
  this.load.image('menu-bg', 'assets/backgrounds/menu-bg.png');
  this.load.audio('menu-music', 'assets/musics/menu-music.mp3');
}

// Fonction de création de la scène
function create() {
  this.input.once('pointerdown', () => {
    // Jouer de la musique après le clic
    const music = this.sound.add('menu-music');
    music.play();
  });
  this.add.image(400, 300, 'menu-bg');  // Ajout de l'image "sky" au centre de l'écran
}

// Fonction d'update
function update() {
  // Code pour mettre à jour la scène à chaque frame
}