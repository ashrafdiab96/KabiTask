import debounce from 'lodash.debounce';

/**
 * @method debounceSearch()
 * @dexc handle debounce search after 3ms
 * @return void
 */
export const debounceSearch = debounce((searchTerm, callback) => {
    callback(searchTerm);
}, 300);
