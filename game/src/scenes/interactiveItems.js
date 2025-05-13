// Objets interactifs non impactants
export function createInteractiveObject(scene, config) {
  const { sprite, x, y, scale = 1, message = "Objet interactif." } = config;

  const object = scene.add.image(x, y, sprite)
    .setInteractive({ useHandCursor: true })
    .setScale(scale)
    .setName(sprite);

  object.on('pointerdown', () => {
    scene.tweens.add({
      targets: object,
      scale: scale * 0.95,
      yoyo: true,
      duration: 100,
    });

    const text = scene.add.text(x, y - 40, message, {
      fontSize: '16px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 }
    }).setOrigin(0.5);

    scene.time.delayedCall(1800, () => {
      scene.tweens.add({
        targets: text,
        alpha: 0,
        duration: 400,
        onComplete: () => text.destroy()
      });
    });
  });

  return object;
}


/*import Phaser from 'phaser';
import GameState from '../data/GameState';

export function createFlower(scene, x, y, souvenirText, ancrageText, nostalgieText) {
    const flower = scene.add.image(x, y, 'flower')
      .setScale(1)
      .setInteractive({ useHandCursor: true });
  
    let flowerClicked = false;
  
    flower.on('pointerdown', () => {
      if (flowerClicked) return;
  
      flowerClicked = true;
      flower.setInteractive(false);
  
      // Animation de la fleur
      scene.tweens.add({
        targets: flower,
        scale: 0.6,
        yoyo: true,
        duration: 150
      });
  
      // Incrémente le souvenirScore
      GameState.souvenirScore += 1;
      souvenirText.setText(`Souvenirs : ${GameState.souvenirScore}`);
      
      // Incrémente l'ancrage au passé
      GameState.ancragePasse += 1;
      ancrageText.setText(`Ancrage au passé : ${GameState.ancragePasse}`);
  
      // Incrémente la nostalgie
      GameState.emergenceNostalgie += 1;
      nostalgieText.setText(`Nostalgie : ${GameState.emergenceNostalgie}`);
  
      // Appel fonction animation MàJ du score
      scene.updateScoreDisplay(souvenirText, ancrageText, nostalgieText);
  
      // Création d’un texte temporaire pour le +1
      const tempText = scene.add.text(flower.x, flower.y - 50, '+1 souvenir', {
        fontSize: '18px',
        fill: '#ffffff'
      }).setOrigin(0.5).setAlpha(1);
  
      // Animation du score flottant
      scene.tweens.add({
        targets: tempText,
        y: tempText.y - 30,
        alpha: 0,
        duration: 1000,
        ease: 'Power1',
        onComplete: () => {
          tempText.destroy(); // Nettoyage après animation
        }
      });
  
      console.log('souvenirScore:', GameState.souvenirScore);
    });
  
    return flower;
}
  
export function createFrame(scene, x, y, souvenirText) {
  const frame = scene.add.image(x, y, 'frame')
    .setScale(0.5)
    .setInteractive({ useHandCursor: true });
  
  let frameClicked = false;
  
  frame.on('pointerdown', () => {
    if (frameClicked) return;
      frameClicked = true;
      frame.setInteractive(false);
  
      // Animation du cadre photo
      scene.tweens.add({
        targets: frame,
        scale: 0.6,
        yoyo: true,
        duration: 150
      });
  
      // Incrémente le souvenirScore
      GameState.souvenirScore += 2;
      souvenirText.setText(`Souvenirs : ${GameState.souvenirScore}`);
  
      // Création d’un texte temporaire pour le +2
      const tempText = scene.add.text(frame.x, frame.y - 50, '+2 souvenir', {
        fontSize: '18px',
        fill: '#ffffff'
      }).setOrigin(0.5).setAlpha(1);
  
      // Animation du texte
      scene.tweens.add({
        targets: tempText,
        y: tempText.y - 30,
        alpha: 0,
        duration: 1000,
        ease: 'Power1',
        onComplete: () => {
          tempText.destroy(); // Nettoyage après animation
        }
      });
  
      console.log('souvenirScore:', GameState.souvenirScore);
    });
  
    return frame;
}
  
export function createBook(scene, x, y, souvenirText) {
  const book = scene.add.image(x, y, 'book')
    .setScale(0.5)
    .setInteractive({ useHandCursor: true });
  
  let bookClicked = false;
  
  book.on('pointerdown', () => {
    if (bookClicked) return;
      bookClicked = true;
      book.setInteractive(false);
  
      // Animation du livre
      scene.tweens.add({
        targets: book,
        scale: 0.6,
        yoyo: true,
        duration: 150
      });
  
      // Incrémente le souvenirScore
      GameState.souvenirScore += 3;
      souvenirText.setText(`Souvenirs : ${GameState.souvenirScore}`);
  
      // Création d’un texte temporaire pour le +3
      const tempText = scene.add.text(book.x, book.y - 50, '+3 souvenir', {
        fontSize: '18px',
        fill: '#ffffff'
      }).setOrigin(0.5).setAlpha(1);
  
      // Animation du texte
      scene.tweens.add({
        targets: tempText,
        y: tempText.y - 30,
        alpha: 0,
        duration: 1000,
        ease: 'Power1',
        onComplete: () => {
          tempText.destroy(); // Nettoyage après animation
        }
      });
  
    console.log('souvenirScore:', GameState.souvenirScore);
  });
  
    return book;
}*/