// ScrollToTop.js

import React, { useState, useEffect } from "react";
import "./App.css"; // Custom CSS for styling

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show or hide the scroll to top button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={isVisible ? "scroll-top-btn show" : "scroll-top-btn"}
      onClick={scrollToTop}
      title="Scroll to top"
    >
      &#8593;
    </button>
  );
}

export default ScrollToTop;
