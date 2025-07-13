import './button.css';
import React from "react";

interface ButtonProperties {
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
  border?: boolean;
}

const Button: React.FC<ButtonProperties> = ({ onClick, children, color = "black", border }) => {
  const style = border
    ? { backgroundColor: "white", border: "2px solid black", color: "black" }
    : { backgroundColor: color, border: "none", color: "white" };
    
return (
    <button
      onClick={onClick}
      className="button"
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;