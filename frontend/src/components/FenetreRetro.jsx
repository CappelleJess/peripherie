import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // 👈 Import framer-motion
import "../styles/style.css";

function FenetreRetro({ title, children, tabs }) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.label || "");

  return (
    <AnimatePresence>
      <motion.div
        className="fenetre-retro"
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {title && <div className="fenetre-retro-title">{title}</div>}

        {tabs && tabs.length > 0 ? (
          <>
            <div className="fenetre-retro-tabs">
              {tabs.map((tab) => (
                <div
                  key={tab.label}
                  className={`fenetre-retro-tab ${
                    activeTab === tab.label ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.label)}
                >
                  {tab.label}
                </div>
              ))}
            </div>

            <div className="fenetre-retro-content">
              {tabs.find((tab) => tab.label === activeTab)?.content}
            </div>
          </>
        ) : (
          <div className="fenetre-retro-content">{children}</div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default FenetreRetro;