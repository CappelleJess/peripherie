import GameState from '../data/GameState';

export function createMemoryObject(scene, config) {
  const {
    key,          // ex: 'flower'
    sprite,       // ex: 'flower'
    x, y,         // position
    scale = 1,    // taille de l'objet
    choices       // dictionnaire { examine: {text, scores}, ... }
  } = config;

  const object = scene.add.image(x, y, sprite).setInteractive({ useHandCursor: true }).setScale(scale);
  let isDialogueOpen = false;
  let halo = null;

  // Ajoute un halo après interaction
  function addHalo() {
    if (halo) return;
    halo = scene.add.circle(object.x, object.y, object.displayWidth / 2 + 5, 0xffff66, 0.3).setDepth(-1);
  }

  // MàJ du texte de score
  function updateScores(scores) {
    if (scores.souvenir) GameState.souvenirScore += scores.souvenir;
    if (scores.ancrage) GameState.ancragePasse += scores.ancrage;
    if (scores.nostalgie) GameState.emergenceNostalgie += scores.nostalgie;
    scene.updateScoreDisplay();
  }

  // Dialogue unique après interaction
  function showMemoryText(choiceKey) {
    const msg = choices[choiceKey].text;
    const boxY = object.y - object.displayHeight / 2 - 30;

    const box = scene.add.rectangle(object.x, boxY, 400, 100, 0x000000, 1).setOrigin(0.5);
    const text = scene.add.text(object.x, boxY, msg, {
      fontSize: '18px', fill: '#ffffff', wordWrap: { width: 380 }
    }).setOrigin(0.5);

    scene.time.delayedCall(2000, () => {
      box.destroy();
      text.destroy();
    });
  }

  // Dialogue complet avec icônes
  function showFullDialogue() {
    isDialogueOpen = true;

    const dialogueBox = scene.add.rectangle(400, 200, 400, 200, 0x000000, 1).setOrigin(0.5);
    const dialogueText = scene.add.text(400, 180, `C'est un objet mémoriel`, {
      fontSize: '18px', fill: '#ffffff', wordWrap: { width: 380 }
    }).setOrigin(0.5);

    const buttons = {
      examine: scene.add.image(250, 250, 'icon_examine').setScale(1).setInteractive(),
      smell: scene.add.image(400, 250, 'icon_smell').setScale(1).setInteractive(),
      ignore: scene.add.image(550, 250, 'icon_ignore').setScale(1).setInteractive()
    };

    for (const [key, btn] of Object.entries(buttons)) {
      btn.on('pointerdown', () => {
        GameState.interactions[key] = key;
        disableAll();
        dialogueText.setText(choices[key].text);
        updateScores(choices[key].scores);
        GameState.interactions[sprite] = key; // enregistre le choix
        addHalo();

        scene.time.delayedCall(2000, () => {
          destroyAll();
          isDialogueOpen = false;
        });
      });
    }

    function disableAll() {
      Object.values(buttons).forEach(btn => btn.disableInteractive());
    }

    function destroyAll() {
      dialogueBox.destroy();
      dialogueText.destroy();
      Object.values(buttons).forEach(btn => btn.destroy());
    }

    scene.time.delayedCall(10000, () => {
      if (isDialogueOpen) {
        destroyAll();
        isDialogueOpen = false;
      }
    });
  }

  // CLIC -> ouvrir boîte de dialogue si pas encore choisi
  object.on('pointerdown', () => {
    if (isDialogueOpen) return;
    if (!GameState.interactions[sprite]) {
      showFullDialogue();
    }
  });

  // SURVOL -> afficher choix fait
  object.on('pointerover', () => {
    const choice = GameState.interactions[sprite];
    if (choice) {
      showMemoryText(choice);
    }
  });

  return object;
}
