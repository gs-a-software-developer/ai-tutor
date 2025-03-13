// Layout.js
import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Authentication from "../pages/Authentication/Authentication";
import Welcome from "../components/Welcome/Welcome";
import Navbar from "../components/Navbar/Navbar";
import Role from "../components/Role/Role";
import UploadFiles from "../components/UploadFiles/UploadFiles"; // Shared sidebar component
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import Files from "../components/Files/Files";
import Modules from "../pages/Modules/Modules";
import styles from "./Layout.module.css";

import ModuleFiles from "../components/ModuleFiles/ModuleFiles";
import Contents from "../pages/Contents/Contents";

// Function to determine sidebar content
const getSidebarComponent = (path) => {
  if (path.startsWith("/authentication")) return <Role />;
  if (path.startsWith("/ai-tutor/modules/")) {
    return <UploadFiles />;
  }
  return null;
};

const Layout = () => {
  const { pathname } = useLocation();
  const isAuthPage = pathname.startsWith("/authentication");
  const [selectedFiles, setSelectedFiles] = useState([]);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        {isAuthPage ? <Welcome /> : <Navbar />}
      </div>
      <div className={styles.center}>
        <div className={styles.content}>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/" element={<Navigate to="/authentication/login" />} />
            <Route path="authentication" element={<Authentication />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route> 

            {/* Other Routes */}
            <Route path="/ai-tutor/modules" element={<Modules />} />
            <Route
              path="/ai-tutor/modules/:moduleName"
              element={<ModuleFiles onSelectFiles={setSelectedFiles} />}
            />
            <Route path="/ai-tutor/files" element={<Files />} />
            <Route path="/ai-tutor/profile" element={<Profile />} />
            <Route path="/ai-tutor/settings" element={<Settings />}/>
          </Routes>
        </div>
        <div className={styles.sidebar}>{getSidebarComponent(pathname)}</div>
      </div>
    </div>
  );
};

export default Layout;