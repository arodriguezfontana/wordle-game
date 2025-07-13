import './button.css';
import React from "react";

interface ButtonProperties {
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
}

const Button: React.FC<ButtonProperties> = ({ onClick, children, color = "#000" }) => {
  return (
    <button
      onClick={onClick}
      className="button"
      style={{backgroundColor: color}}
    >
      {children}
    </button>
  );
};

export default Button;