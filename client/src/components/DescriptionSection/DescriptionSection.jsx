// DescriptionSection
import React from "react";
import styles from "./DescriptionSection.module.css";

const DescriptionSection = ({ description, isOpen }) => (
  isOpen ? (
    <div className={`${styles.bottomSection} ${isOpen ? styles.bottomSectionOpen : ''}`}>
      <p className="text-2">Description</p>
      <p className={styles.description}>{description}</p>
    </div>
  ) : null
);

export default DescriptionSection;