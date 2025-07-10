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
      style={{
        backgroundColor: color,
        color: "white",
        padding: "10px 16px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s ease"
      }}
    >
      {children}
    </button>
  );
};

export default Button;