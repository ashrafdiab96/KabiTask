import React, { useState, useEffect } from 'react';
import styles from './job.module.scss';
import { useRouter } from 'next/router';
import jobs from '../../../../jobs.json';

const Job = () => {
    /* router variable */
    const router = useRouter();

    /* job id from router query */
    const { id } = router?.query;

    /* state variable to set job details */
    const [job, setJob] = useState();

    /**
     * @effect
     * @desc set job details after get it's id
     */
    useEffect(() => {
        setJob(jobs?.filter(j => j?.id == id)?.[0]);
    }, [router]);

    return (
        <div className={styles.job}>
            <img src='/images/noimg.jpg' />
            <div className={styles.content}>
                <div className={styles.title}>{job?.jobTitle}</div>
                <div className={styles.city}>{job?.country?.name}, {job?.city?.name}</div>
                <div className={styles.sector}>{job?.sector?.name}</div>
                <div className={styles.desc}>{job?.desc}</div>
            </div>
        </div>
    );
};

export default Job;