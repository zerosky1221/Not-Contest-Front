import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchModal } from "./SearchModal";
import { useStore } from "../store/useStore";
import { useTheme } from "../context/ThemeContext";

export const BottomNav: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    if (path === "/search") {
      setShowSearchModal(true);
    } else {
      history.push(path);
    }
  };

  return (
    <>
      <nav className="bottom-nav">
        <motion.button
          className={`bottom-nav-item ${isActive("/") ? "active" : ""}`}
          onClick={() => handleNavigation("/")}
          whileTap={{ scale: 0.9 }}
        >
          <Icon
            icon="lucide:home"
            className={`text-xl mb-1 ${
              isActive("/") ? "text-white" : "text-[#818181]"
            }`}
          />
          <span>Home</span>
        </motion.button>

        <motion.button
          className="bottom-nav-item"
          onClick={() => handleNavigation("/search")}
          whileTap={{ scale: 0.9 }}
        >
          <Icon icon="lucide:search" className="text-xl mb-1 text-[#818181]" />
          <span>Search</span>
        </motion.button>

        <motion.button
          className={`bottom-nav-item ${isActive("/account") ? "active" : ""}`}
          onClick={() => handleNavigation("/account")}
          whileTap={{ scale: 0.9 }}
        >
          <Icon
            icon="lucide:user"
            className={`text-xl mb-1 ${
              isActive("/account") ? "text-white" : "text-[#818181]"
            }`}
          />
          <span>Account</span>
        </motion.button>
      </nav>

      <AnimatePresence>
        {showSearchModal && (
          <SearchModal onClose={() => setShowSearchModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};
