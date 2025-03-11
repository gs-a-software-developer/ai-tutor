// FileIcon
import React from "react";
import { Video, FileText, Image } from "@phosphor-icons/react";
import styles from "./FileIcon.module.css";

const FileIcon = ({ type }) => {
  switch (type) {
    case "video":
      return <Video size={32} color="var(--color-primary)" weight="thin" className={styles.icon} />;
    case "document":
      return <FileText size={32} color="var(--color-primary)" weight="thin" className={styles.icon} />;
    case "image":
      return <Image size={32} color="var(--color-primary)" weight="thin" className={styles.icon} />;
    default:
      return null;
  }
};

export default FileIcon;
