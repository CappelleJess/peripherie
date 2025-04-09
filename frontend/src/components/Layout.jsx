import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Layout général : Header en haut, contenu central via <Outlet />, Footer en bas.
 * <Outlet /> représente ici les pages imbriquées (Homepage, Login, etc.)
 */
function Layout({ isAuthenticated, setIsAuthenticated, children }) {
  return (
    <>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>

      <main style={{ padding: "2rem" }}>
        {children}
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;