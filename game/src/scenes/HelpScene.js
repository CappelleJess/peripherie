import Phaser from 'phaser';

export default class HowToPlay extends Phaser.Scene {
    constructor() {
        super('HelpScene');
    }

    create() {
        this.add.text(400, 100, 'Comment jouer', {
            fontSize: '32px',
            fill: '#ffffff',
        }).setOrigin(0.5);

        this.add.text(400, 250, 
            "- Explore la pièce avec la souris. \n- Clique sur les objets, certains te proposerons d'interagir de manière différente avec eux. \n- Chacun de tes choix affecte ta mémoire et ton lien au passé.",
            {
                fontSize: '18px',
                fill: '#dddddd',
                align: 'center',
                wordWrap: { width: 600 }
            }
        ).setOrigin(0.5);

        const backButton = this.add.text(400, 500, 'Retour', {
            fontSize: '24px',
            fill: '#dddddd',
            backgroundColor: '#444',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        backButton.on('pointerover', () => {
            this.input.setDefaultCursor('url(assets/images/arrow_hover.png), pointer');
            backButton.setStyle({ fill: '#ffffff', backgroundColor: '#555' });
        });

        backButton.on('pointerout', () => {
            this.input.setDefaultCursor('url(assets/images/arrow.png), pointer');
            backButton.setStyle({ fill: '#dddddd', backgroundColor: '#444' });
        });

        backButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });

        this.cameras.main.fadeIn(600, 0, 0, 0);
    }
}