import React from 'react';
import Styles from './lib/header.module.css';

const Header = () => {
    return <header>
        <h1 className={Styles.header}>My Blog</h1>
    </header>
}

export default Header