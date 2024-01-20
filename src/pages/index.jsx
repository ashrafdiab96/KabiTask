import React, { useState } from 'react';
import styles from './Home.module.scss';
import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout';
import { useDispatch } from 'react-redux';
import { openAddJobModal } from '@/redux/store';

const Home = () => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState();

    const handleOpenAddJob = () => {
        dispatch(openAddJobModal());
    };

    return (
        <DefaultLayout>
            <div className={styles.Home}>
                <div className={styles.Jobs}>
                    <div className={styles.SearchAndAdd}>
                        <input
                            type='text'
                            placeholder='Search By Job Title'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className={styles.inp}
                        />
                        <button
                            className={styles.btn}
                            onClick={handleOpenAddJob}
                        >Add New Job</button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Home;