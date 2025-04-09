import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Mettre à jour l’état pour afficher l’UI de repli
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Enregistrer l’erreur
    console.error("Error caught:", error);
    console.error("Error info:", info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Quelque chose s'est mal passé. Veuillez réessayer plus tard.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;