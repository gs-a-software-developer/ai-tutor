import React from "react";
import buttonstyles from "../../styles/buttonstyles.module.css";

const Button = ({ type, onClick, children, className, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonstyles.button} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;