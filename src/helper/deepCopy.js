import PropTypes from "prop-types";

export const deepCopy = (obj) => {
    // Create an empty object or array to hold the copied properties
    const copy = Array.isArray(obj) ? [] : {};

    // Copy each property, recursively calling `deepCopy` for any nested objects or arrays
    for (let key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            copy[key] = deepCopy(obj[key]);
        } else {
            copy[key] = obj[key];
        }
    }

    return copy;
}

deepCopy.prototype = {
    obj: PropTypes.object.isRequired
}