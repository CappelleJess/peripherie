import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Layout général : Header en haut, contenu central via <Outlet />, Footer en bas.
 * <Outlet /> = pages imbriquées (Homepage, Login, etc.)
 */
function Layout() {
  return (
    <>
      <Header />
      <main style={{ padding: "2rem" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;