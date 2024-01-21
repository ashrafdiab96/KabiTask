import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
    name: 'selectedFilters',
    initialState: {
        selectedSectors: [],
        selectedCountries: [],
        selectedCities: [],
    },
    reducers: {
        setFilterSector: (state, action) => {
            state.selectedSectors = action.payload;
        },
        setFilterCountries: (state, action) => {
            state.selectedCountries = action.payload;
        },
        setFilterCities: (state, action) => {
            state.selectedCities = action.payload;
        },
    },
});

export default filtersSlice;
