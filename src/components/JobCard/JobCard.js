import React from 'react';
import styles from './JobCard.module.scss';
import { useRouter } from 'next/router';

const JobCard = ({ job }) => {
    const router = useRouter();

    /**
     * @method showJob()
     * @dexc handle clieck on job eye to open job details
     * @return void
     */
    const showJob = () => {
        router.push(`/job/${job?.id}`);
    };
    
    /**
     * @method deleteJob()
     * @dexc handle deletejob by send job id to deleteJob file via DELETE request
     * @return void
     */
    const deleteJob = async () => {
        try {
            const response = await fetch('/api/deleteJob', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: job?.id }),
            });
      
            if (response.ok) {
                console.log('Data deleted successfully!');
            } else {
                console.error('Failed to delete data:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <div className={styles.JobCard}>
            <div className={styles.Data}>
                <img src='/images/noimg.jpg' alt='job-image' />
                <div className={styles.content}>
                    <div className={styles.title}>{job?.jobTitle} {job?.id}</div>
                    <div className={styles.city}>{job?.country?.name}, {job?.city?.name}</div>
                    <div className={styles.sector}>{job?.sector?.name}</div>
                    <div className={styles.desc}>{job?.desc?.slice(0, 80)}...</div>
                </div>
            </div>
            <div className={styles.actions}>
                <img
                    src='/images/show.png'
                    alt='show-image'
                    onClick={showJob}
                />
                <img
                    src='/images/delete.png'
                    alt='delete-image'
                    onClick={deleteJob}
                />
            </div>
        </div>
    );
};

export default JobCard;
