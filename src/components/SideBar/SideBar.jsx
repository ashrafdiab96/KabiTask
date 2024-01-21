import React, { useEffect, useState } from 'react';
import styles from './SideBar.module.scss';
import filters from '../../data/filters';
import { setFilterSector, setFilterCountries, setFilterCities } from '@/redux/store';
import { useDispatch } from 'react-redux';
import useWindowSize from '@/hooks/useWindowSize';

const SideBar = ({ openFilter, setOpenFilter }) => {
    /* call redux dispatch */
    const dispatch = useDispatch();
    
    /* variable which calculate screen width */
    const { width, height } = useWindowSize();

    /* state variables */
    const [selectedSector, setSelectedSector] = useState();
    const [sectors, setSectors] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [selectedCities, setSelectedCities] = useState([]);
    const [cities, setCities] = useState([]);

    /**
     * @method handleSector()
     * @dexc set selected sector
     * @param e -> event variable which carry input target
     * @return void
     */
    const handleSector = async (e) => {
        const sectorId = parseInt(e.target.value);
        const selectedSector = filters?.sectors?.find(sector => sector.id === sectorId);
        setSelectedSector(selectedSector);
        if (selectedSector) {
            const isSelected = sectors.includes(selectedSector.id);
            if (isSelected) {
                setSectors(prevSelected => prevSelected.filter(id => id !== selectedSector.id))
            } else {
                setSectors(prevSelected => [...prevSelected, selectedSector.id]);
            }
        }
    };

    /**
     * @method handleCountry()
     * @dexc set selected country and it's city
     * @param e -> event variable which carry input target
     * @return void
     */
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

    /**
     * @method handleCity()
     * @dexc set selected city
     * @param e -> event variable which carry input target
     * @return void
     */
    const handleCity = (e) => {
        const cityId = parseInt(e.target.value);
        const selectedCity = cities?.find(city => city.id === cityId);
        setSelectedCountry(selectedCity);
        if (selectedCity) {
            const isSelected = selectedCities.includes(selectedCity.id);
            if (isSelected) {
                setSelectedCities(prevSelected => prevSelected.filter(id => id !== selectedCity.id));
            } else {
                setSelectedCities(prevSelected => [...prevSelected, selectedCity.id]);
            }
        }
    };

    /**
     * @effect
     * @dexc set selected sectors in global state filters
     */
    useEffect(() => {
        dispatch(setFilterSector(sectors));
    }, [sectors]);

    /**
     * @effect
     * @dexc set selected countire in global state filters
     */
    useEffect(() => {
        dispatch(setFilterCountries(selectedCountries));
        const selectedCities = filters?.countries
        ?.filter(country => selectedCountries.includes(country.id))
        ?.flatMap(country => country.cities);
        setCities(selectedCities);
    }, [selectedCountries]);

    /**
     * @effect
     * @dexc set selected cities in global state filters
     */
    useEffect(() => {
        dispatch(setFilterCities(selectedCities));
    }, [selectedCities]);

    return (
        <div
            className={styles.SideBar}
            style={{ display: width < 820 ? openFilter ? 'flex' : 'none' : 'flex' }}    
        >
            <div className={styles.close} onClick={() => setOpenFilter(false)}>x</div>
            <div className={styles.filter}>
                <div className={styles.title}>Sector</div>
                {filters?.sectors?.map((sector, index) => (
                    <div className={styles.value} key={index}>
                        <label className={styles.lbl}>
                            <input
                                type='checkbox'
                                value={sector?.id}
                                onChange={handleSector}
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
                                onChange={handleCity}
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