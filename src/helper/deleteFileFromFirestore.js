import {deleteObject, getStorage, ref} from "firebase/storage";
import PropTypes from "prop-types";

/**
 * function to handle delete files from firestore
 * @param data - data to delete
 * @param action - action description
 */

export const deleteFileFromFirestore = (data, action) => {
    const storage = getStorage();
    switch (action) {
        case 'delete-all':
            let promises = [];
            data.map(item => promises.push(deleteObject(ref(storage, item.url))))
            Promise.all(promises)
                .then()
                .catch(err => {
                return window.displayNotification({
                    type: 'error',
                    content: `There was a Error deleting Images ${err}`
                })
            })
            break;
        case 'delete-one':
            deleteObject(ref(storage, data.url))
                .then()
                .catch(err => {
                return window.displayNotification({
                    type: 'error',
                    content: `There was a Error deleting the Image ${err}`
                })
            })
            break;
        default:
            break;
    }
};

deleteFileFromFirestore.prototype = {
    data: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]).isRequired,
    action: PropTypes.string.isRequired
}