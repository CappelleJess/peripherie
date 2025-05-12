import Phaser from 'phaser';
import GameState from '../data/GameState';
import { createMemoryObject } from './memoryItems';

export default class RoomScene extends Phaser.Scene {
  constructor() {
    super('RoomScene');
  }

  preload() {
    // Images
    this.load.image('background', 'assets/backgrounds/room.png');
    this.load.image('flower', 'assets/images/flower.png');
    this.load.image('flower_glow', 'assets/images/flower_glow.png');
    this.load.image('icon_examine', 'assets/images/icon_examine.png');
    this.load.image('icon_smell', 'assets/images/icon_smell.png');
    this.load.image('icon_ignore', 'assets/images/icon_ignore.png');

    // Audio
    // this.load.audio('ambience', 'assets/audio/ambience_room.mp3');
    // this.load.audio('select', 'assets/audio/memory_select.wav');

    // Curseur personnalisé
    this.load.image('cursor', 'assets/images/arrow.png');
    this.load.image('cursor_hover', 'assets/images/arrow_hover.png');
  }

  create() {
    // Apparition en fondu
    this.cameras.main.setBackgroundColor('#000000');
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    // Son d'ambiance
    // this.ambience = this.sound.add('ambience', { loop: true, volume: 0.4 });
    // this.ambience.play();

    // Curseur personnalisé
    this.input.setDefaultCursor('url(assets/images/arrow.png), pointer');

    // Fond
    this.add.image(400, 300, 'room').setOrigin(0.5);

    // Texte de score
    this.souvenirText = this.add.text(20, 20, `Souvenirs : ${GameState.souvenirScore}`, {
      fontSize: '20px',
      fill: '#ffffff'
    });

    this.ancrageText = this.add.text(20, 50, `Ancrage : ${GameState.ancragePasse}`, {
      fontSize: '20px',
      fill: '#ffffff'
    });

    this.nostalgieText = this.add.text(20, 80, `Nostalgie : ${GameState.emergenceNostalgie}`, {
      fontSize: '20px',
      fill: '#ffffff'
    });

    // Charger la progression depuis l’API
    this.initGameProgress();

    // Création objet mémoire : flower
    createMemoryObject(this, {
      key: 'flower',
      sprite: 'flower',
      x: 600,
      y: 400,
      scale: 1,
      choices: {
        examine: {
          text: "Cette fleur te rappelle un souvenir agréable de l’époque où tout semblait plus simple.",
          scores: { souvenir: 1, ancrage: 1, nostalgie: 1 }
        },
        smell: {
          text: "L'odeur de la fleur t'envahit, apportant avec elle des souvenirs chaleureux mais lourds.",
          scores: { souvenir: 2, ancrage: 2 }
        },
        ignore: {
          text: "Tu détournes le regard, préférant éviter de raviver ce souvenir.",
          scores: { ancrage: -1 }
        }
      }
    });

    // Initialisation de la progression/Nb d'interactions réalisées
    GameState.objectsInteracted = 0;
  }

  update() {
    // Si halos lumineux sont actifs, les synchroniser avec les objets
    if (this.memoryObjects) {
      this.memoryObjects.forEach(({ object, halo }) => {
        if (halo) {
          halo.x = object.x;
          halo.y = object.y;
        }
      });
    }

    // Fin du niveau après 3 interactions
    if (GameState.objectsInteracted >= 3 && !this.transitioning) {
      this.transitioning = true;
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        this.sendGameScoresUpdate(); // Sauvegarde finale facultative
        console.log('Fin du niveau atteinte. Transition à venir.');
        // TODO : transition vers scène suivante
      });
    }
  }

  // MàJ de l’affichage à l’écran avec les dernières valeurs des scores
  updateScoreDisplay() {
    this.souvenirText.setText(`Souvenirs : ${GameState.souvenirScore}`);
    this.ancrageText.setText(`Ancrage : ${GameState.ancragePasse}`);
    this.nostalgieText.setText(`Nostalgie : ${GameState.emergenceNostalgie}`);
  }

  // Récupère la progression du joueur via un appel GET à l’API
  initGameProgress() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!token || !user?._id) {
      console.error("Utilisateur non authentifié.");
      return;
    }

    fetch(`http://localhost:5000/api/game/progress/${user._id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        GameState.souvenirScore = data.souvenirScore || 0;
        GameState.ancragePasse = data.ancragePasse || 0;
        GameState.emergenceNostalgie = data.emergenceNostalgie || 0;
        this.updateScoreDisplay();
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des scores :", err);
      });
  }

  // Envoie un choix du joueur au backend via POST (ex: examine, ignore…)
  sendPlayerChoice(choiceKey, impactOnStory) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!token || !user?._id) return;

    fetch(`http://localhost:5000/api/game/choices/${user._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ choice: choiceKey, impactOnStory })
    })
      .then(res => res.json())
      .then(updatedProfile => {
        // Met à jour les scores locaux avec les nouvelles valeurs du backend
        GameState.souvenirScore = updatedProfile.souvenirScore;
        GameState.ancragePasse = updatedProfile.ancragePasse;
        GameState.emergenceNostalgie = updatedProfile.emergenceNostalgie;
        this.updateScoreDisplay();
      })
      .catch(err => {
        console.error("Erreur lors de l'enregistrement du choix :", err);
      });
  }

  // Envoie les scores actuels au backend via PUT (trigger fin de scène)
  sendGameScoresUpdate() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!token || !user?._id) return;

    fetch(`http://localhost:5000/api/game/scores/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        souvenirScore: GameState.souvenirScore,
        ancragePasse: GameState.ancragePasse,
        emergenceNostalgie: GameState.emergenceNostalgie
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Scores mis à jour :", data);
      })
      .catch(err => {
        console.error("Erreur lors de la mise à jour des scores :", err);
      });
  }
}