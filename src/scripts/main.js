class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        //Chargement des ressources pour le fond
        this.load.image('layer1', '../src/assets/images/backgrounds/menu/1.png'); //Ciel
        this.load.image('layer2', '../src/assets/images/backgrounds/menu/2.png'); 
        this.load.image('layer3', '../src/assets/images/backgrounds/menu/3.png'); 
        this.load.image('layer4', '../src/assets/images/backgrounds/menu/4.png');
        this.load.image('layer5', '../src/assets/images/backgrounds/menu/5.png');
    
        //Chargement du bouton
        this.load.image('button', '../src/assets/images/buttons/button.png');
        this.load.image('buttonpress',);
    }
    
    create() {
        //Animation parallax: ajout des couches
        this.layer1 = this.add.tileSprite(0, 0, 800, 600, 'layer1').setOrigin(0, 0);
        this.layer2 = this.add.tileSprite(0, 0, 800, 600, 'layer2').setOrigin(0, 0);
        this.layer3 = this.add.tileSprite(0, 0, 800, 600, 'layer3').setOrigin(0, 0);
        this.layer4 = this.add.tileSprite(0, 0, 800, 600, 'layer4').setOrigin(0, 0);
        this.layer5 = this.add.tileSprite(0, 0, 800, 600, 'layer5').setOrigin(0, 0);
    
        //Titre du menu
        this.add.text(this.scale.width / 2, 50, 'Menu', {
            font: '32px Verdana',
            fill: '#ffffff',
        }).setOrigin(0.5);
    
        //Bouton
        const playButton = this.add.image(400, 200, 'button')
        .setInteractive() // Rend le bouton cliquable
        .on('pointerdown', () => {
            playButton.setTexture('buttonpress');
        })

        .on('pointerup', () => {
            this.time.delayedCall(150, () => {
                playButton.setTexture('button');
                this.scene.start('GameScene'); // Lance la scène
            });   
        });
    
        this.add.text(400, 200, 'Jouer', {
            font: '20px Arial',
            fill: '#000000', 
        }).setOrigin(0.5);
    }
    
    update() {
        this.layer1.tilePositionX += 0; // Ciel
        this.layer2.tilePositionX += 0.2;
        this.layer3.tilePositionX += 0.5;
        this.layer4.tilePositionX += 1.5;
        this.layer5.tilePositionX += 2;
    }
}

// Configuration du jeu
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [MenuScene] // Utilise MenuScene directement ici
};
  
// Création du jeu
new Phaser.Game(config);

