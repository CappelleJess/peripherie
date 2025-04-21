import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Actualites from "./pages/Actualites";
import Play from "./pages/Play";
import GameUniverse from "./pages/GameUniverse";

import Layout from "./components/Layout";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Routes publiques */}
        <Route path="play" element={<PublicRoute element={<Play />} path="/play" />}/>
        <Route path="gameuniverse" element={<PublicRoute element={<GameUniverse />} path="/gameuniverse" />}/>
        <Route path="news" element={<PublicRoute element={<Actualites />} path="/news" />}/>

        {/* Routes protégées */}
        <Route path="dashboard" element={<PrivateRoute element={<Dashboard />} />}/>
        <Route path="settings" element={<PrivateRoute element={<Settings />} />}/>

        {/* Route 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;