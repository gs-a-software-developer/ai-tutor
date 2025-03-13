// Modules.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModules } from "../../redux/actions/modulesActions";
import { useNavigate } from "react-router-dom";
import ModuleList from "../../components/ModuleList/ModuleList";
import styles from "./Modules.module.css";

function Modules() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modules, error } = useSelector((state) => state.modules);

  useEffect(() => {
    dispatch(fetchModules());
  }, [dispatch]);

  const handleModuleClick = (moduleName) => {
    navigate(`/ai-tutor/modules/${moduleName}`);
  };

  return (
    <div className={styles.contentsContainer}>
      <h1 className={styles.title}>Modules</h1>
      {error ? (
        <p className={styles.error}>Error: {error}</p>
      ) : (
        <ModuleList modules={modules} onModuleClick={handleModuleClick} />
      )}
    </div>
  );
}

export default Modules;
