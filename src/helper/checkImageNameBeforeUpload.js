import PropTypes from "prop-types";

/**
 * Check main image meet name requirement because this name is going to be used to folder name in firestore
 * @param image - array
 * @returns {*}
 */
export const checkImageNameBeforeUpload = (image) => {
    return image.find(i => /^[a-zA-Z\s]+$/.test(i.File.name.split('.')[0]))
};

checkImageNameBeforeUpload.prototype = {
    image: PropTypes.array.isRequired
}