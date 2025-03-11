import React, { useState } from "react";
import PropTypes from "prop-types";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import styles from "./AddFileDetails.module.css";
import buttonstyles from "../../styles/buttonstyles.module.css";

// Import module names and content types from JSON files
import moduleData from "../../data/modules.json";
import contentTypeData from "../../data/contentTypes.json";

const AddFileDetails = ({ onNext, onBack, formData }) => {
  const [details, setDetails] = useState(formData || {});
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(details);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleSelect = (name, value) => {
    setDetails({ ...details, [name]: value });
  };

  return (
    <div className={styles.container}>
      <p className={`${styles.subTitle} text-1`}>
        Please provide the details for the file you have uploaded.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <label className={styles.gridItemTitle}>File Title</label>
            <input
              type="text"
              name="title"
              value={details.title || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.gridItem}>
            <label className={styles.gridItemTitle}>Module Name</label>
            <Dropdown
              label={details.moduleName || "Select Module Name"}
              isOpen={openDropdown === "moduleName"}
              toggle={() => toggleDropdown("moduleName")}
              options={moduleData.moduleCodes}
              onSelect={(value) => handleSelect("moduleName", value)}
              selectedOption={details.moduleName}
            />
          </div>
          <div className={styles.gridItem}>
            <label className={styles.gridItemTitle}>Content Type</label>
            <Dropdown
              label={details.contentType || "Select Content Type"}
              isOpen={openDropdown === "contentType"}
              toggle={() => toggleDropdown("contentType")}
              options={contentTypeData.contentTypes}
              onSelect={(value) => handleSelect("contentType", value)}
              selectedOption={details.contentType}
            />
          </div>
        </div>
        <div className={`${styles.buttons} ${buttonstyles.buttonsContainer}`}>
          <Button type="button" onClick={onBack} className={buttonstyles.backButton}>
            Back
          </Button>
          <Button type="button" onClick={handleSubmit} className={buttonstyles.nextButton}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

AddFileDetails.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  formData: PropTypes.object,
};

export default AddFileDetails;
