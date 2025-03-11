import React from "react";
import styles from "./Profile.module.css"; // Ensure the correct file extension
import { siteUnderconstruction } from "../../assets";

const Profile = () => {
  return (
    <div className={styles.container}>
      <img
        src={siteUnderconstruction}
        alt="Under Construction"
        className={styles.image}
      />
      <p className={styles.message}>
        We’re busy working on something awesome! Our site is under construction,
        but we’ll be up and running soon.
      </p>
    </div>
  );
};

export default Profile;
