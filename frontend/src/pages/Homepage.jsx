import React, { useState } from "react";
import IntroTerminal from "../components/IntroTerminal";

function Homepage() {
  const [introDone, setIntroDone] = useState(false);


  return (
    <>
      {!introDone ? (
        <IntroTerminal onFinish={() => setIntroDone(true)} />
      ) : (
          <main>
            <h1>Bienvenue dans Périphérie</h1>
            <p>Explorez les souvenirs perdus d’un passé qui s’efface.</p>
            {/* contenu principal */}
          </main>
      )}
    </>
  );
}

export default Homepage;