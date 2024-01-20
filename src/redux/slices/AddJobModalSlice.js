import { createSlice } from '@reduxjs/toolkit';

const AddJobModalSlice = createSlice({
    name: 'addJobModal',
    initialState: {
        open: false,
    },
    reducers: {
        openAddJobModal: (state) => {
			state.open = true;
		},
		closeAddJobModal: (state) => {
			state.open = false;
		},
    },
});

export default AddJobModalSlice;