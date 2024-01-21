import React, { useState } from 'react';
import styles from './DefaultLayout.module.scss';
import SideBar from '@/components/SideBar/SideBar';

const DefaultLayout = ({ children }) => {
    /* State variable to handle filter open in responsive */
    const [openFilter, setOpenFilter] = useState(false);

    return (
        <div className={styles.DefaultLayout}>
            <div className={styles.toggleFilter}>
                {openFilter ? (
                    <img
                        src='/images/filter-fill.png'
                        onClick={() => setOpenFilter(!openFilter)}
                    />
                ) : (
                    <img
                        src='/images/filter.png'
                        onClick={() => setOpenFilter(!openFilter)}
                    />
                )}
            </div>
            <SideBar openFilter={openFilter} setOpenFilter={setOpenFilter} />
            <div className={styles.Content}>
                {children}
            </div>
        </div>
    );
};

export default DefaultLayout;