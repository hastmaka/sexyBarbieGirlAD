import PropTypes from "prop-types";

/**
 * handle numbers to only allow two values after the dot
 * @param value - string
 * @returns {*}
 */
export const handleDecimalsOnValue = (value) => {
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
    return value.match(regex)[0];
};

handleDecimalsOnValue.prototype = {
    value: PropTypes.string.isRequired
}