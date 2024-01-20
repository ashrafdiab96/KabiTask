import React, { useEffect, useState } from 'react';
import styles from './SideBar.module.scss';
import filters from '../../data/filters';

const SideBar = () => {
    const [selectedSector, setSelectedSector] = useState();
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const handleCountry = (e) => {
        const countryId = parseInt(e.target.value);
        const selectedCountry = filters?.countries?.find(country => country.id === countryId);
        setSelectedCountry(selectedCountry);
        if (selectedCountry) {
            const isSelected = selectedCountries.includes(selectedCountry.id);
            if (isSelected) {
                setSelectedCountries(prevSelected => prevSelected.filter(id => id !== selectedCountry.id));
            } else {
                setSelectedCountries(prevSelected => [...prevSelected, selectedCountry.id]);
            }
        }
    };

    useEffect(() => {
        const selectedCities = filters?.countries
        ?.filter(country => selectedCountries.includes(country.id))
        ?.flatMap(country => country.cities);
        setCities(selectedCities);
    }, [selectedCountries]);

    return (
        <div className={styles.SideBar}>
            <div className={styles.filter}>
                <div className={styles.title}>Sector</div>
                {filters?.sectors?.map((sector, index) => (
                    <div className={styles.value} key={index}>
                        <label className={styles.lbl}>
                            <input
                                type='checkbox'
                                value={sector?.id}
                                onChange={e => setSelectedSector(e.target.value)}
                            />
                            <span>{sector?.name}</span>
                        </label>
                    </div>
                ))}
            </div>
            <div className={styles.filter}>
                <div className={styles.title}>Countries</div>
                {filters?.countries?.map((country, index) => (
                    <div className={styles.value} key={index}>
                        <label className={styles.lbl}>
                            <input
                                type='checkbox'
                                value={country?.id}
                                onChange={handleCountry}
                            />
                            <span>{country?.name}</span>
                        </label>
                    </div>
                ))}
            </div>
            <div className={styles.filter}>
                <div className={styles.title}>Cities</div>
                {cities?.map((city, index) => (
                    <div className={styles.value} key={index}>
                        <label className={styles.lbl}>
                            <input
                                type='checkbox'
                                value={city?.id}
                                onChange={e => setSelectedCity(e.target.value)}
                            />
                            <span>{city?.name}</span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBar;