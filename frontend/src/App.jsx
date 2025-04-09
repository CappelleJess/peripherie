import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Layout général avec Header + Footer
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRoute from "./components/PrivateRoute";

// Pages spécifiques
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

/**
 * Composant racine de l'application.
 * Définition d'une route parent "/" qui utilise le Layout,
 * et on imbrique les routes enfants dedans.
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ErrorBoundary>
    <Routes>
      {/* Route parent avec le layout général */}
      <Route path="/" element={<Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}>
        {/* Route par défaut ("/") */}
        <Route index element={<Homepage />} />

        {/* Autres routes imbriquées */}
        <Route path="login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="register" element={<Register />} />
        
        <Route path="profile" element={<PrivateRoute isAuthenticated={isAuthenticated}><Profile /></PrivateRoute>} />
        <Route path="dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated}><Dashboard /></PrivateRoute>} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} /> {/*Route 404*/}
      </Route>
    </Routes>
    </ErrorBoundary>
  );
}

export default App;