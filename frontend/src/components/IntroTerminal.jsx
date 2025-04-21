import React, { useEffect, useState } from "react";
import "../styles/style.css";

const phrases = [
  "Initialisation du terminal...",
  "Chargement des souvenirs...",
  "Connexion établie.",
];

function IntroTerminal({ onFinish }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentPhraseIndex < phrases.length) {
      const phrase = phrases[currentPhraseIndex];

      if (charIndex < phrase.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + phrase[charIndex]);
          setCharIndex(charIndex + 1);
        }, 60); // vitesse de frappe
        return () => clearTimeout(timeout);
      } else {
        const pause = setTimeout(() => {
          setDisplayedText("");
          setCharIndex(0);
          setCurrentPhraseIndex(currentPhraseIndex + 1);
        }, 1000); // pause entre phrases
        return () => clearTimeout(pause);
      }
    } else {
      // Fin de l’intro → appelle le callback (ex: pour afficher Homepage)
      const done = setTimeout(onFinish, 800);
      return () => clearTimeout(done);
    }
  }, [charIndex, currentPhraseIndex, onFinish]);

  return (
    <div className="terminal-intro">
      <p>{displayedText}<span className="cursor"></span></p>
    </div>
  );
}

export default IntroTerminal;
