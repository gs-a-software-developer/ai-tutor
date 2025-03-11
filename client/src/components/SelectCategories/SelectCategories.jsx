// SelectCategories.js
import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import styles from "./SelectCategories.module.css";
import buttonstyles from "../../styles/buttonstyles.module.css";
import themesData from "../../data/themes.json";

const SelectCategories = ({ onBack, onFinish, formData }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [details, setDetails] = useState(formData || {});
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFinish(selectedItem ? [selectedItem] : []);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleSelect = (name, value) => {
    setDetails({ ...details, [name]: value });
  };

  const themes = themesData.themes;

  return (
    <div className={styles.container}>
      <p className={`${styles.subTitle} text-1`}>
        Please select the theme that best matches your file details.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <label className={styles.gridItemTitle}>Select Theme</label>
            <Dropdown
              label={details.moduleName || "Select Theme"}
              isOpen={openDropdown === "moduleName"}
              toggle={() => toggleDropdown("moduleName")}
              options={themes}
              onSelect={(value) => handleSelect("moduleName", value)}
              selectedOption={details.moduleName}
            />
          </div>
        </div>
        <div className={`${styles.buttonsContainer} ${buttonstyles.buttonsContainer}`}>
          <Button type="button" onClick={onBack} className={buttonstyles.backButton}>
            Back
          </Button>
          <Button
            type="submit"
            className={buttonstyles.nextButton}
            disabled={!selectedItem}
          >
            Finish
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SelectCategories;
