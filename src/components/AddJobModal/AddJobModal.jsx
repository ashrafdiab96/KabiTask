import React, { useState } from 'react';
import styles from './AddJobModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '@/hooks/useWindowSize';
import { closeAddJobModal } from '@/redux/store';
import filters from '../../data/filters.json';
import jobs from '../../../jobs.json';

const AddJobModal = () => {
    /* call redux dispatch */
    const dispatch = useDispatch();
    
    /* variable which calculate screen width */
	const { width } = useWindowSize();

    /* state variables */
    const [jobName, setJobName] = useState();
    const [selectedSector, setSelectedSector] = useState();
    const [selectedSectorName, setSelectedSectorName] = useState();
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedCountryName, setSelectedCountryName] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [selectedCityName, setSelectedCityName] = useState();
    const [cities, setCities] = useState([]);
    const [desc, setDesc] = useState();

    /* redux store variables */
    const { open } = useSelector(state => state.addJobModal);
    
    /**
     * @method handleCountry()
     * @dexc set selected country and it's cities
     * @param e -> event variable which carry input target
     * @return void
     */
    const handleCountry = (e) => {
        const countryId = parseInt(e.target.value);
        const selectedCountry = filters?.countries?.find(country => country.id === countryId);
        setSelectedCountry(e.target.value);
        setCities(selectedCountry?.cities);
        setSelectedCountryName(selectedCountry?.name);
    };

    /**
     * @method handleSector()
     * @dexc set selected sector
     * @param e -> event variable which carry input target
     * @return void
     */
    const handleSector = (e) => {
        const sectorId = parseInt(e.target.value);
        const selectedSector = filters?.sectors?.find(sector => sector.id === sectorId);
        setSelectedSector(e.target.value);
        setSelectedSectorName(selectedSector?.name);
    };

    /**
     * @method handleCity()
     * @dexc set selected city
     * @param e -> event variable which carry input target
     * @return void
     */
    const handleCity = (e) => {
        const cityId = parseInt(e.target.value);
        const selectedCity = cities?.find(city => city.id === cityId);
        setSelectedCity(e.target.value);
        setSelectedCityName(selectedCity?.name);
    };

    /**
     * @method handleSubmit()
     * @dexc handle add new job by send request with payload to addJob page
     * @return void
     */
    const handleSubmit = async () => {
        const payload = {
            "id": jobs[jobs.length - 1]?.id + 1,
            "jobTitle": jobName,
            "sector": {
                "id": parseInt(selectedSector),
                "name": selectedSectorName
            },
            "country": {
                "id": parseInt(selectedCountry),
                "name": selectedCountryName
            },
            "city": {
                "id": parseInt(selectedCity),
                "name": selectedCityName
            },
            "desc": desc
        };
        try {
            const response = await fetch('/api/addJob', {
                method: "POST",
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('A new job has been added successfully!');
            } else {
                console.error('Failed to add a new job:', response.statusText);
            }

        } catch(error) {
            console.log(`An unexpected error occured: ${error}`);
        }
    };

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
                            onChange={handleSector}
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
                            onChange={handleCity}
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