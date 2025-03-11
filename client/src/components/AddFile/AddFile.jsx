import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setFileDetails, setCategories } from '../../redux/actions/uploadActions';
import UploadFileComponent from '../UploadFile/UploadFileComponent';
import AddFileDetails from '../AddFileDetails/AddFileDetails';
import SelectCategories from '../SelectCategories/SelectCategories';
import { X } from "@phosphor-icons/react";
import styles from "./AddFile.module.css";
import typography from "../../styles/typography.module.css";

const AddFile = ({ onClose }) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = (data) => {
    if (currentStep === 1) {
      dispatch(setFileDetails(data));
    } else if (currentStep === 2) {
      dispatch(setCategories(data));
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = () => {
    const steps = [
      <UploadFileComponent key={0} onNext={handleNextStep} />,
      <AddFileDetails key={1} onNext={handleNextStep} onBack={handlePrevStep} />,
      <SelectCategories key={2} onNext={handleNextStep} onBack={handlePrevStep} onClose={onClose} />
    ];
    return steps[currentStep] || null;
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={typography["heading-2"]}>Upload File</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.modalContent}>{renderStepContent()}</div>
      </div>
    </div>
  );
};

AddFile.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddFile;