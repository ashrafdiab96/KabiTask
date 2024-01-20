import React from 'react';
import styles from './DefaultLayout.module.scss';
import SideBar from '@/components/SideBar/SideBar';

const DefaultLayout = ({ children }) => {
    return (
        <div className={styles.DefaultLayout}>
            <SideBar />
            <div className={styles.Content}>
                {children}
            </div>
        </div>
    );
};

export default DefaultLayout;