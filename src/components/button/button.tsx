import './button.css';
import React from "react";
import { useButton } from "../../hooks/useButton";

interface ButtonProperties {
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
  border: boolean;
}

const Button: React.FC<ButtonProperties> = ({ onClick, children, color = "black", border }) => {
  const {
         style
      } = useButton (border, color);

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