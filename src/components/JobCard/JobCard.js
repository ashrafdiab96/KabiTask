import React from 'react';
import styles from './JobCard.module.scss';

const JobCard = ({ job }) => {
    return (
        <div className={styles.JobCard}>
            <div className={styles.Data}>
                <img src='/images/noimg.jpg' alt='job-image' />
                <div className={styles.content}>
                    <div className={styles.title}>{job?.title}</div>
                    <div className={styles.city}>{job?.country?.name}, {job?.city?.name}</div>
                    <div className={styles.sector}>{job?.sector?.name}</div>
                    <div className={styles.desc}>{job?.desc?.slice(0, 80)}...</div>
                </div>
            </div>
            <div className={styles.actions}></div>
        </div>
    );
};

export default JobCard;
