import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="login" element={<PublicRoute element={<Login />} />} />
        <Route path="register" element={<PublicRoute element={<Register />} />} />

        {/* Routes protégées */}
        <Route
          path="dashboard"
        element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="profile"
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route
          path="settings"
          element={<PrivateRoute element={<Settings />} />}
        />

        {/* Route 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;