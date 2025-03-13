import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { SquaresFour, User, Stack, Gear, SignOut } from "@phosphor-icons/react";
import { upgrade } from "../../assets";
import styles from "./Navbar.module.css";

// Reusable Nav Item Component
const NavItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link to={to}>
        <div
          className={classNames(styles.link, { [styles.activeLink]: isActive })}
        >
          <Icon size={20} weight={isActive ? "regular" : "light"} className={styles.icon} />
          <div>{label}</div>
        </div>
      </Link>
    </li>
  );
};

// Upgrade Section
const UpgradeSection = () => (
  <div className={styles.upgradeSection}>
    <img src={upgrade} alt="Upgrade" className={styles.bottomImage} />
    <button className={styles.upgradeButton}>Upgrade</button>
  </div>
);

// Navbar Component
const Navbar = () => {
  const upperMenuItems = [
    // { to: "/ai-tutor", icon: Gauge, label: "Dashboard" },
    
    { to: "/ai-tutor/modules", icon: SquaresFour, label: "Modules" },
    { to: "/ai-tutor/files", icon: Stack, label: "Files" },
    { to: "/ai-tutor/profile", icon: User, label: "Profile" },
  ];

  const bottomMenuItems = [
    { to: "/ai-tutor/settings", icon: Gear, label: "Settings" },
    { to: "/", icon: SignOut, label: "Logout" },
  ];

  return (
    <nav className={styles.container}>
      <div className={styles.logoContainer}>
        <span className={styles.appName}>AI Tutor</span>
      </div>

      <ul className={styles.upperMenu}>
        {upperMenuItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </ul>

      <ul className={styles.bottomMenu}>
        <UpgradeSection />
        {bottomMenuItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
