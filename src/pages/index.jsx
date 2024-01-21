import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { openAddJobModal } from '@/redux/store';
import jobs from '../../jobs.json';
import JobCard from '@/components/JobCard/JobCard';
import { debounceSearch } from '@/helpers/debounce';

const Home = () => {
    /* items that show per every page in pagination */
    const itemPerPage = 10;
    
    /* call redux dispatch */
    const dispatch = useDispatch();

    /* state variables */
    const [search, setSearch] = useState();
    const [filteredJobs, setFilteredJobs] = useState(jobs);
    const [page, setPage] = useState(1);
    const [startsItem, setStartsItem] = useState(0);
    const [endItem, setEndItem] = useState(3);
    const [pageNumbers, setPageNumbers] = useState(Array.from({ length: Math.ceil(filteredJobs?.length / itemPerPage) }, (_, index) => index + 1));
    
    /* redux store variables */
    const { selectedFilters } = useSelector(state => state);

    /**
     * @method handleOpenAddJob()
     * @dexc handle open add new job modal
     * @return void
     */
    const handleOpenAddJob = () => {
        dispatch(openAddJobModal());
    };

    /**
     * @method handlePrev()
     * @dexc handle previous page in pagination
     * @return void
     */
    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    /**
     * @method handleNext()
     * @dexc handle next page in pagination
     * @return void
     */
    const handleNext = () => {
        if (page < Math.ceil(filteredJobs?.length / itemPerPage)) {
            setPage(page + 1);
        }
    };

    /**
     * @method handlePage()
     * @dexc handle clicke page in pagination
     * @return void
     */
    const handlePage = (item) => {
        setPage(item);
    };

    /**
     * @effct
     * @desc set number of pages when jobs are changed by search or filter
     */
    useEffect(() => {
        const itemCount = Math.ceil(filteredJobs?.length / itemPerPage);
        setPageNumbers(Array.from({ length: itemCount }, (_, index) => index + 1));
    }, [filteredJobs]);

    /**
     * @effct
     * @desc set start item which start the items in the page when page changes
     */
    useEffect(() => {
        setStartsItem((page * itemPerPage) - itemPerPage);
    }, [page]);

    /**
     * @effct
     * @desc set end item which end the items in the page when page changes
     */
    useEffect(() => {
        setEndItem(startsItem + itemPerPage);
    }, [startsItem]);

    /**
     * @effct
     * @desc apply filter when selectedFilters (from redux) chenges
     */
    useEffect(() => {
        const filtered = jobs.filter((job) => {
            const sectorMatches =
                selectedFilters.selectedSectors.length === 0 ||
                selectedFilters.selectedSectors.includes(job.sector?.id);
            const countryMatches =
                selectedFilters.selectedCountries.length === 0 ||
                selectedFilters.selectedCountries.includes(job.country?.id);
            const cityMatches =
                selectedFilters.selectedCities.length === 0 ||
                selectedFilters.selectedCities.includes(job.city?.id);
            return sectorMatches && countryMatches && cityMatches;
        });
        setFilteredJobs(filtered);
    }, [selectedFilters]);

    /**
     * @effct
     * @desc apply debounce search when search changes
     */
    useEffect(() => {
        debounceSearch(search, (searchTerm) => {
            const filtered = searchTerm == '' || searchTerm == null ? jobs
            : filteredJobs.filter((job) =>
                job?.jobTitle?.toLowerCase()?.includes(searchTerm?.toLowerCase())
            );
            setFilteredJobs(filtered);
        });
    }, [search]);

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
                    <div className={styles.AllJobs}>
                        {filteredJobs?.slice(startsItem, endItem)?.map((job, index) => (
                            <div key={index}>
                                <JobCard job={job} />
                            </div>
                        ))}
                        <div className={styles.pagination}>
                            <div 
                                className={styles.prev}
                                onClick={handlePrev}
                                style={{ pointerEvents: page > 1 ? '' : 'none' }}
                            >Prev</div>
                            {pageNumbers?.map((item, index) => (
                                <div
                                    className={[styles.number, page == item ?  styles.activePage : null].join(' ')}
                                    key={index}
                                    onClick={() => handlePage(item)}
                                >{item}</div>
                            ))}
                            <div 
                                className={styles.next}
                                onClick={handleNext}
                                style={{ pointerEvents: page < Math.ceil(filteredJobs?.length / itemPerPage) ? '' : 'none' }}
                            >Next</div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Home;