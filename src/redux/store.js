import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PERSIST, persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import AddJobModalSlice from "./slices/AddJobModalSlice";
import filtersSlice from "./slices/FiltersSlice";

const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistedReducer = persistReducer(
    {
        key: "root",
        storage,
        blacklist: ["messages"],
        whitelist: ["auth", "user"],
    },
    combineReducers({
        addJobModal: AddJobModalSlice.reducer,
        selectedFilters: filtersSlice.reducer,
    })
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: { ignoreActions: [PERSIST] },
        });
    },
});

export const presistor = persistStore(store);

export const {
    openAddJobModal,
    closeAddJobModal
} = AddJobModalSlice.actions;

export const {
    setFilterSector,
    setFilterCountries,
    setFilterCities
} = filtersSlice.actions;

export default store;
