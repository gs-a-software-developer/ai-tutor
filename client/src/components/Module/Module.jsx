// Module.jsx
import React from "react";
import { CaretCircleRight } from "@phosphor-icons/react";
import { truncateTextByWords } from "../../utils/helpers";
import styles from "./Module.module.css";

const Module = ({ module }) => {
  const moduleCodeStyle = {
    color: module.moduleColor,
    backgroundColor: `${module.moduleColor}15`,
    border: "none",
    borderRadius: "25px",
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: `${module.moduleColor}15`,
        borderColor: module.moduleColor,
      }}
    >
      <div className={styles.leftSection}>
        <img src={module.image} alt="Module" className={styles.image} />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.textContainer}>
          <p className={styles.moduleName}>{module.moduleName}</p>
          <p className={styles.moduleDescription}>
            {truncateTextByWords(module.moduleDescription, 30)}
          </p>
        </div>
        <div className={styles.bottomTextContainer}>
          <span className={styles.moduleCode} style={moduleCodeStyle}>
            {module.moduleCode}
          </span>
          <span className={styles.icon}>
            <CaretCircleRight
              size={32}
              weight="fill"
              color={module.moduleColor}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Module;
