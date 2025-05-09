/*import GameState from '../src/data/GameState';

export function showFlowerDialogue(scene, flower, souvenirText, ancrageText, nostalgieText) {
  const priorChoice = GameState.interactions.flower;

  const flowerX = flower.x;
  const flowerY = flower.y;

  // Si une interaction existe déjà -> affichage unique
  if (priorChoice !== null) {
    const messages = {
      examine: "Cette fleur te rappelle un souvenir agréable de l’époque où tout semblait plus simple.",
      smell: "L'odeur de la fleur t'envahit, apportant avec elle des souvenirs chaleureux mais lourds.",
      ignore: "Tu détournes le regard, préférant éviter de raviver ce souvenir."
    };

    const msg = messages[priorChoice];

    const dialogueBox = scene.add.rectangle(flowerX, flowerY - 100, 400, 100, 0x000000, 1).setOrigin(0.5);
    const dialogueText = scene.add.text(flowerX, flowerY - 100, msg, {
      fontSize: '18px',
      fill: '#ffffff',
      wordWrap: { width: 380 }
    }).setOrigin(0.5);

    scene.tweens.add({
      targets: [dialogueBox, dialogueText],
      alpha: 1,
      duration: 300
    });

    scene.time.delayedCall(2000, () => {
      dialogueBox.destroy();
      dialogueText.destroy();
    });

    return;
  }

  // Création des éléments
  const dialogueBox = scene.add.rectangle(400, 200, 400, 200, 0x000000, 1 /*OPACITÉ*/).setOrigin(0.5);
  const dialogueText = scene.add.text(400, 180, "C'est un brin de myosotis", {
    fontSize: '18px',
    fill: '#ffffff',
    wordWrap: { width: 380 }
  }).setOrigin(0.5);

  const examineButton = scene.add.image(250, 250, 'icon_examine').setScale(1).setInteractive();
  const smellButton = scene.add.image(400, 250, 'icon_smell').setScale(1).setInteractive();
  const ignoreButton = scene.add.image(550, 250, 'icon_ignore').setScale(1).setInteractive();

  scene.tweens.add({
    targets: [dialogueBox, dialogueText, examineButton, smellButton, ignoreButton],
    alpha: 1,
    duration: 500
  });

  const closeTimer = setTimeout(() => {
    closeDialogue();
  }, 10000); // auto-fermeture au bout de 10s

  function disableAllButtons() {
    examineButton.disableInteractive();
    smellButton.disableInteractive();
    ignoreButton.disableInteractive();
    clearTimeout(closeTimer);
  }

  function closeDialogue() {
    scene.tweens.add({
      targets: [dialogueBox, dialogueText, examineButton, smellButton, ignoreButton],
      alpha: 0,
      duration: 500,
      onComplete: () => {
        dialogueBox.destroy();
        dialogueText.destroy();
        examineButton.destroy();
        smellButton.destroy();
        ignoreButton.destroy();
      }
    });
  }

  examineButton.on('pointerdown', () => {
    disableAllButtons();
    GameState.interactions.flower = 'examine';

    dialogueText.setText("Cette fleur te rappelle un souvenir agréable de l’époque où tout semblait plus simple.");
    GameState.souvenirScore += 1;
    GameState.ancragePasse += 1;
    GameState.emergenceNostalgie += 1;
    scene.updateScoreDisplay();

    setTimeout(() => {
      closeDialogue();
    }, 2000);
  });

  smellButton.on('pointerdown', () => {
    disableAllButtons();
    GameState.interactions.flower = 'smell';

    dialogueText.setText("L'odeur de la fleur t'envahit, apportant avec elle des souvenirs chaleureux mais lourds.");
    GameState.souvenirScore += 2;
    GameState.ancragePasse += 2;
    scene.updateScoreDisplay();

    setTimeout(() => {
      closeDialogue();
    }, 2000);
  });

  ignoreButton.on('pointerdown', () => {
    disableAllButtons();
    GameState.interactions.flower = 'ignore';

    dialogueText.setText("Tu détournes le regard, préférant éviter de raviver ce souvenir.");
    GameState.ancragePasse -= 1;
    scene.updateScoreDisplay();

    setTimeout(() => {
      closeDialogue();
    }, 2000);
  });
}*/
