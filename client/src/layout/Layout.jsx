// Layout.js
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Authentication from "../pages/Authentication/Authentication";
import Welcome from "../components/Welcome/Welcome";
import Navbar from "../components/Navbar/Navbar";
import Role from "../components/Role/Role";
import UploadFiles from "../components/UploadFiles/UploadFiles"; // Shared sidebar component
import Dashboard from "../components/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import Files from "../components/Files/Files";
import styles from "./Layout.module.css";

// Function to determine sidebar content
const getSidebarComponent = (path) => {
  if (path.startsWith("/authentication")) return <Role />;
  if (
    path.startsWith("/ai-tutor") ||
    path.startsWith("/ai-tutor/profile") ||
    path.startsWith("/ai-tutor/files") || 
    path.startsWith("/ai-tutor/settings")
  ) {
    return <UploadFiles />;
  }
  return null;
};

const Layout = () => {
  const { pathname } = useLocation();
  const isAuthPage = pathname.startsWith("/authentication");

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
            {/* <Route path="/ai-tutor" element={<Dashboard />} /> */}
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
