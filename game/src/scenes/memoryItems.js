import GameState from '../data/GameState';

/**
 * Crée un objet mémoire interactif dans la scène
 * @param {Phaser.Scene} scene - La scène active
 * @param {Object} config - Configuration de l’objet mémoire
 * @param {string} config.key - ID unique (ex : 'flower')
 * @param {string} config.sprite - Nom du sprite affiché
 * @param {number} config.x - Position X
 * @param {number} config.y - Position Y
 * @param {number} config.scale - Échelle de l’image
 * @param {Object} config.choices - Choix interactifs (examine, smell, ignore)
 */

export function createMemoryObject(scene, config) {
  const { key, sprite, x, y, scale = 1, choices } = config;

  // Création du sprite de l'objet interactif
  const object = scene.add.image(x, y, sprite)
    .setInteractive({ useHandCursor: true })
    .setScale(scale)
    .setName(key);

  let isDialogueOpen = false;
  let halo = null;

  function addHalo() {
    if (halo) return;

    const haloKey = `${sprite}_glow`;
    if (!scene.textures.exists(haloKey)) {
      console.warn(`Texture ${haloKey} non chargée`);
      return;
    }

    halo = scene.add.image(object.x, object.y, haloKey)
      .setScale(object.scale)
      .setAlpha(0.7)
      .setDepth(object.depth + 1);

    if (!scene.memoryObjects) scene.memoryObjects = [];
    scene.memoryObjects.push({ object, halo });
  }

  function updateScores(scores) {
    if (scores.souvenir) GameState.souvenirScore += scores.souvenir;
    if (scores.ancrage) GameState.ancragePasse += scores.ancrage;
    if (scores.nostalgie) GameState.emergenceNostalgie += scores.nostalgie;
    scene.updateScoreDisplay();
  }

  function showMemoryText(choiceKey) {
    const msg = choices[choiceKey].text;
    const boxY = object.y - object.displayHeight / 2 - 60;

    const box = scene.add.rectangle(object.x, boxY, 400, 100, 0x000000, 1).setOrigin(0.5);
    const text = scene.add.text(object.x, boxY, msg, {
      fontSize: '18px', fill: '#ffffff', wordWrap: { width: 380 }
    }).setOrigin(0.5);

    scene.time.delayedCall(2000, () => {
      scene.tweens.add({
        targets: [box, text],
        alpha: 0,
        duration: 500,
        ease: 'Power1',
        onComplete: () => {
          box.destroy();
          text.destroy();
        }
      });
    });
  }

  function getIntroText(objectKey) {
    switch (objectKey) {
      case 'flower': return "Un brin de myosotis...";
      case 'book': return "Un carnet mystérieux...";
      case 'frame': return "Un cadre photo usé...";
      default: return "Un objet intrigant...";
    }
  }

  function showFullDialogue() {
    const currentKey = key;
    isDialogueOpen = true;
    GameState.dialogueOpen = true;

    // Boîte de dialogue noire au centre de l’écran
    const dialogueBox = scene.add.rectangle(512, 250, 400, 200, 0x000000, 1).setOrigin(0.5);
    // Texte d'intro unique selon l'objet
    const dialogueText = scene.add.text(512, 230, getIntroText(currentKey), {
      fontSize: '18px', fill: '#ffffff', wordWrap: { width: 380 }
    }).setOrigin(0.5);

    const buttons = {};
    const keys = Object.keys(choices);                  // Ex: ['examine'], ['ignore', 'smell']
    const boxWidth = 400;
    const iconSpacing = boxWidth / (keys.length + 1);   // espace régulier dans la boîte
    const startX = 512 - (boxWidth / 2) + iconSpacing;  // point de départ dans la boîte

    keys.forEach((choiceKey, index) => {
      const iconKey = `icon_${choiceKey}`;              // ex: 'icon_examine'
      const x = startX + iconSpacing * index;
      const btn = scene.add.image(x, 300, iconKey)
        .setScale(1)
        .setInteractive();

      btn.on('pointerdown', () => {
        // Animation de clic visuelle
        scene.tweens.add({
          targets: btn,
          scale: btn.scale * 0.9,
          yoyo: true,
          duration: 100
        });  

        // Marquer l'interaction dans GameState
        GameState.interactions[sprite] = choiceKey;
        // Désactiver les autres boutons
        disableAll();
        // Afficher le texte du choix
        dialogueText.setText(choices[choiceKey].text);
        // Mettre à jour les scores localement
        updateScores(choices[choiceKey].scores);
        // Ajouter l'effet visuel lumineux
        addHalo();
        // Incrémenter le nombre d’objets interactés
        GameState.objectsInteracted = (GameState.objectsInteracted || 0) + 1;

        // Envoyer le choix au backend via RoomScene
        if (typeof scene.sendPlayerChoice === 'function') {
          scene.sendPlayerChoice(choiceKey, choices[choiceKey].text);
        }

        // Fermer le dialogue après un délai
        scene.time.delayedCall(2000, () => {
          destroyAll();
          isDialogueOpen = false;
          GameState.dialogueOpen = false;
        });
      });

      buttons[choiceKey] = btn;
    });

    // Désactive tous les boutons restants
    function disableAll() {
      Object.values(buttons).forEach(btn => btn.disableInteractive());
    }

    // Détruit les éléments de la boîte de dialogue 
    function destroyAll() {
      const allElements = [dialogueBox, dialogueText, ...Object.values(buttons)];

      scene.tweens.add({
        targets: allElements,
        alpha: 0,
        duration: 400,
        ease: 'Power1',
        onComplete: () => {
          allElements.forEach(el => el.destroy());
        }
      });
    }

    // Sécurité : fermeture automatique après 10s si rien n’est cliqué
    scene.time.delayedCall(10000, () => {
      if (isDialogueOpen) {
        destroyAll();
        isDialogueOpen = false;
        GameState.dialogueOpen = false;
      }
    });
  }

  // Déclenche le dialogue complet si l’objet n’a pas encore été utilisé
  object.on('pointerdown', () => {
    if (isDialogueOpen) return;
    if (!GameState.interactions[sprite]) {
      scene.tweens.add({
        targets: object,
        scale: object.scale * 0.9,
        yoyo: true,
        duration: 120
      });
      showFullDialogue();
    }
  });

  // Affiche le texte souvenir si survolé après interaction
  object.on('pointerover', () => {
    scene.input.setDefaultCursor('url(assets/images/arrow_hover.png), pointer');
    const choice = GameState.interactions[sprite];
    if (choice && !GameState.dialogueOpen) {
      showMemoryText(choice);
    }
  });

  object.on('pointerout', () => {
    scene.input.setDefaultCursor('url(assets/images/arrow.png), pointer');
  });

  return object;
}