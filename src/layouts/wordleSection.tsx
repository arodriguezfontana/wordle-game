import React from "react";
import "./wordleSection.css";

interface WordleSectionProperties {
    children: React.ReactNode;
}

const WordleSection = ({ children } : WordleSectionProperties ) => {
  return (
      <div className="wordle-section-container">
        <article>
          <h1>Wordle</h1>
          {children}
        </article>
      </div>
  );
};

export default WordleSection;