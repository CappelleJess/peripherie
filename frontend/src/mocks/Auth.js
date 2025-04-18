import axios from "axios";

/**
 * Simule une requête de login avec un petit délai.
 * Accepte n'importe quel email + mot de passe, pour simuler un backend.
 */
export function fakeLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        // Simule une réponse avec un faux token
        resolve({
          data: {
            token: "fake-jwt-token",
            user: { email },
          },
        });
      } else {
        reject(new Error("Email ou mot de passe manquant."));
      }
    }, 1000); // Simule un délai de 1 seconde
  });
}
