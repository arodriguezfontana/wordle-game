import React from "react";
import "./h1Section.css";

interface H1SectionProperties {
    children: React.ReactNode;
    title: string;
}

const H1Section = ({ children, title } : H1SectionProperties ) => {
  return (
      <div className="wordle-section-container">
        <article>
          <h1>{title}</h1>
          {children}
        </article>
      </div>
  );
};

export default H1Section;