import React from "react";
import "./h1Section.css";

interface H1SectionProperties {
    children: React.ReactNode;
    title: string;
}

const H1Section = ({ children, title } : H1SectionProperties ) => {
  return (
      <div className="h1-section-container">
        <article>
          <h1 className="h1-title">{title}</h1>
          {children}
        </article>
      </div>
  );
};

export default H1Section;