import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
      <div>
        <h1>404 - Page non trouvée</h1>
        <p>La page demandée n'existe pas.</p>
        <Link to="/">Retour à l’accueil</Link>
      </div>
    );
  }
  
  export default NotFound;