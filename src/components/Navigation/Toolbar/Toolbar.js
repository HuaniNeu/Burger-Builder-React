import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) =>(
    <header className ={styles.Toolbar} height ="80%">
        <DrawerToggle menu={props.toggleClicked}/>
        <Logo/>
        <nav className={styles.DesktopOnly}>
            <NavItems/>
        </nav>
    </header>
);

export default toolbar;