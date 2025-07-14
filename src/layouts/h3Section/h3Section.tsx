import React from "react";
import "./h3Section.css";

interface H3SectionProperties {
    children: React.ReactNode;
    title: string;
}

const H3Section = ({ children, title } : H3SectionProperties ) => {
  return (
      <div>
        <article>
          <h3 className="h3-title">{title}</h3>
          {children}
        </article>
      </div>
  );
};

export default H3Section;