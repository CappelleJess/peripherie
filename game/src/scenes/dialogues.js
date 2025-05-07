import GameState from '../data/GameState';

export function showFlowerDialogue(scene, x, y, souvenirText, ancrageText, nostalgieText) {
  // Créer la boîte de dialogue
  const dialogueBox = scene.add.rectangle(400, 200, 400, 200, 0x000000, 0.8);
  const dialogueText = scene.add.text(380, 180, "C'est un brin de myosotis", {
    fontSize: '18px',
    fill: '#ffffff'
  }).setOrigin(0.5);

  // Créer les options avec les icônes
  const examineButton = scene.add.image(250, 250, 'icon_examine').setScale(0.5).setInteractive();
  const smellButton = scene.add.image(400, 250, 'icon_smell').setScale(0.5).setInteractive();
  const ignoreButton = scene.add.image(550, 250, 'icon_ignore').setScale(0.5).setInteractive();

  // Action examine : souvenir positif
  examineButton.on('pointerdown', () => {
    GameState.souvenirScore += 1;
    souvenirText.setText(`Souvenirs : ${GameState.souvenirScore}`);
    GameState.ancragePasse -= 1;
    ancrageText.setText(`Ancrage : ${GameState.ancragePasse}`);
    GameState.emergenceNostalgie += 2;
    nostalgieText.setText(`Nostalgie : ${GameState.emergenceNostalgie}`);
    dialogueText.setText("Cette fleur vous rappelle un souvenir agréable de l’époque où tout semblait plus simple.");
    closeDialogue();
  });

  // Action smell : souvenir doux mais envahissant
  smellButton.on('pointerdown', () => {
    GameState.souvenirScore += 2;
    souvenirText.setText(`Souvenirs : ${GameState.souvenirScore}`);
    GameState.ancragePasse += 1;
    ancrageText.setText(`Ancrage : ${GameState.ancragePasse}`);
    GameState.emergenceNostalgie += 3;
    nostalgieText.setText(`Nostalgie : ${GameState.emergenceNostalgie}`);
    dialogueText.setText("L'odeur de la fleur vous envahit, apportant avec elle des souvenirs chaleureux mais lourds.");
    closeDialogue();
  });

  // Action ignore : éviter les souvenirs
  ignoreButton.on('pointerdown', () => {
    dialogueText.setText("Vous détournez le regard, préférant éviter de raviver ce souvenir.");
    closeDialogue();
  });

  // Fonction pour fermer la boîte de dialogue
  function closeDialogue() {
    dialogueBox.setAlpha(0);  // Ferme la boîte de dialogue
    dialogueText.setAlpha(0);  // Cache le texte
    examineButton.setAlpha(0);  // Cache les icônes
    smellButton.setAlpha(0);
    ignoreButton.setAlpha(0);
  }
}