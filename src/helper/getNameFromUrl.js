import PropTypes from "prop-types";

export const getNameFromUrl = (url) => {
    let name = '';
    for (let i = url.indexOf('.jpg'); i >= 0 ; i--) {
        if(url.split('')[i] !== 'F') {
            name += url.split('')[i]
        } else {
            break
        }
    }
    return name.split("").reverse().join("") + 'jpg';
};

getNameFromUrl.prototype = {
    url: PropTypes.array.isRequired
}