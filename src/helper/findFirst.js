import PropTypes from "prop-types";

export const findFirst = (condition, array) => {
    for (let object of array) {
        if (condition(object)) {
            return object;
        }
        for (let [key, value] of Object.entries(object)) {
            if (Array.isArray(value)) {
                const found = findFirst(condition, value);
                if (found !== undefined) {
                    return found;
                }
            }
        }
    }
}

findFirst.prototype = {
    condition: PropTypes.func.isRequired,
    array: PropTypes.array.isRequired
}