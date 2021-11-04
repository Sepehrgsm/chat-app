import React from 'react';
import styles from "./Navbar.module.css";

const Navbar = ({ logouthandler}) => {
    return (
        <div className={styles.container}>
            <div className={styles.name}>
                sep chat
            </div>
            <div className={styles.logout} onClick={logouthandler}>
                Logout
            </div>
        </div>
    );
};

export default Navbar;