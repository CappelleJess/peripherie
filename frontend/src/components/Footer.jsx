import React from "react";

function Footer() {
  // Tableau de citations
  const quotes = [
    "Le temps perdu n'est jamais perdu, il est toujours retrouvé dans un souvenir. — Marcel Proust, Du côté de chez Swann",
    "Les souvenirs sont la seule chose que nous possédons vraiment. — Virginia Woolf, Mrs Dalloway",
    "La nostalgie, c'est le désir de revenir à un passé qui n'existe plus. — Gabriel García Márquez, L'amour au temps du choléra",
    "Le souvenir est une sorte de retour. Mais il est toujours un retour dans le futur. — Milan Kundera, L'insoutenable légèreté de l'être",
    "La mémoire est une faculté qui conserve non pas des images, mais des impressions vivantes, et c’est ce qui fait que le souvenir ne s'éteint jamais totalement. — Henri Bergson, Matière et mémoire",
    "Le souvenir est ce qui demeure de nous dans l’âme des autres. — Italo Calvino, Si par une nuit d'hiver un voyageur",
    "L’homme qui hésite est un homme qui n'a pas de mémoire. L’homme qui se souvient est celui qui, malgré tout, avance. — Albert Camus, Le Mythe de Sisyphe",
    "La mémoire est le regard avec lequel on se voit à travers le temps. — Jean-Paul Sartre, Les Mots",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  function formatQuote(quote) {
    if (!quote.includes("—")) {
      return <p className="crt-text">"{quote}"</p>;
    }

    const [text, authorAndBook] = quote.split(" — ");
    const [author, book] = authorAndBook.split(", ");

    return (
      <>
        <p className="crt-text">"{text}"</p>
        <p className="crt-text author-book">
          <strong>{author}</strong>, <em>{book}</em>
        </p>
      </>
    );
  }

  return (
    <footer className="retro-footer">
      <p className="crt-text">~ Dernière connexion : {new Date().toLocaleDateString()} ~</p>
      {formatQuote(randomQuote)}
      <p>&copy; Projet Périphérie 2025 - Version 0.9</p>
    </footer>
  );
}

export default Footer;