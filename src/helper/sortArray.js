import PropTypes from "prop-types";

/**
 * @param array - wherever array
 * @param key - key for the sort method
 * @returns {*[]}
 */
export const sortArray = (array, key = 'color') => {
    const compare = (a, b) => {
        if (a[key] > b[key]) return 1;
        if (a[key] < b[key]) return -1;
        return 0
    }
    return [...array].sort(compare)
};

sortArray.prototype = {
    array: PropTypes.array.isRequired,
    key: PropTypes.string
}