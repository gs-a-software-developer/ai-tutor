// DropdownButton.jsx
import React from "react";
import { CaretCircleDown, CaretCircleUp } from "@phosphor-icons/react";
import styles from "./DropdownButton.module.css";

const DropdownButton = ({ isOpen, onClick }) => (
  <button onClick={onClick} className={styles.dropdownButton}>
    {isOpen ? (
      <CaretCircleUp size={24} weight="fill" color="var(--color-primary)" />
    ) : (
      <CaretCircleDown size={24} weight="fill" color="var(--color-primary)" />
    )}
  </button>
);

export default DropdownButton;