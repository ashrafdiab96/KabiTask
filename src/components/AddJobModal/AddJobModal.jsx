import React from 'react';
import styles from './AddJobModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '@/hooks/useWindowSize';
import { closeAddJobModal } from '@/redux/store';
import filters from '../../data/filters';
import { useState } from 'react';

const AddJobModal = () => {
    const dispatch = useDispatch();
	const { width } = useWindowSize();

    const [jobName, setJobName] = useState();
    const [selectedSector, setSelectedSector] = useState();
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [cities, setCities] = useState([]);
    const [desc, setDesc] = useState();

    const { open } = useSelector(state => state.addJobModal);

    const handleCountry = (e) => {
        const countryId = parseInt(e.target.value);
        const selectedCountry = filters?.countries?.find(country => country.id === countryId);
        setSelectedCountry(e.target.value);
        setCities(selectedCountry?.cities);
    };

    const handleSubmit = () => {};

    return (
        <div className={styles.AddJobModal}>
			<div
				style={
					open
						? { opacity: 0.5, visibility: "visible" }
						: { opacity: 0, visibility: "hidden" }
				}
				className={styles.backdrop}
				onClick={() => dispatch(closeAddJobModal())}
			/>
			<div
				className={styles.AddJobModal}
				style={
					open
						? {
								visibility: "visible",
								scale: (width > 820 ? width / 1920 : width / 375).toString(),
						  }
						: {
								visibility: "hidden",
								scale: 0,
						  }
				}>
                <div className={styles.title}>
                    <h1>Add New Job Post</h1>
                </div>
				<div className={styles.form}>
					<div className={styles.row}>
                        <input
                            type='text'
                            placeholder='Job Title'
                            value={jobName}
                            onChange={e => setJobName(e.target.value)}
                        />
                        <select
                            value={selectedSector}
                            onChange={e => setSelectedSector(e.target.value)}
                        >
                            <option>Sector</option>
                            {filters?.sectors?.map((item, index) => (
                                <option
                                    key={index}
                                    value={item?.id}
                                    selected={item?.id == selectedSector}
                                >{item?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.row}>
                        <select
                            value={selectedCountry}
                            onChange={handleCountry}
                        >
                            <option>Country</option>
                            {filters?.countries?.map((item, index) => (
                                <option
                                    key={index}
                                    value={item?.id}
                                    selected={item?.id == selectedCountry}
                                >{item?.name}</option>
                            ))}
                        </select>
                        <select
                            value={selectedCity}
                            onChange={e => setSelectedCity(e.target.value)}
                        >
                            <option>City</option>
                            {cities?.map((item, index) => (
                                <option
                                    key={index}
                                    value={item?.id}
                                    selected={item?.id == selectedCity}
                                >{item?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.row}>
                        <textarea
                            rows={8}
                            placeholder='Description'
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                        />
                    </div>
				</div>
                <div className={styles.actions}>
                    <button
                        className={styles.cancel}
                        onClick={() => dispatch(closeAddJobModal())}
                    >
						Cancel
					</button>
                    <button
                        className={styles.submit}
                        onClick={handleSubmit}
                    >
                        Add New Job
                    </button>
                </div>
			</div>
        </div>
    );
}

export default AddJobModal;