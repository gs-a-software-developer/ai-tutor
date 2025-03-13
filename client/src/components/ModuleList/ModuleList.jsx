import React from "react";
import Module from "../Module/Module";
import contentImages from "../../assets";
import styles from "./ModuleList.module.css";
import "../../styles/variables.module.css";

const ModuleList = ({ modules, onModuleClick }) => {
  return (
    <div className={`${styles.modulesGrid} p-20`}>
      {modules.map((module, index) => (
        <div
          className={styles.moduleItem}
          key={module.moduleCode}
          onClick={() => onModuleClick(module.moduleName)}
        >
          <Module
            module={{
              ...module,
              image: contentImages[`content${index + 1}`],
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ModuleList;
