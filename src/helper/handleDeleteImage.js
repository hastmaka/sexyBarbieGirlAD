import PropTypes from "prop-types";
import {deleteFileFromFirestore} from "./deleteFileFromFirestore";

/**
 * use case
 * delete one local
 * delete all local
 * delete one firestore
 * delete all firestore
 * @param item - can be an object (in case just want to delete one) or string
 * in case want to delete all
 * @param data - temp product
 * @param setData - func to set product
 * @param hiddenInputRef - ref to reset input value and prevent bugs
 * @param setProgress
 */
export const handleDeleteImage = (item, data, setData, hiddenInputRef, setProgress) => {
    let deleteAllImg = typeof item === 'string';
    window.confirm({
        type: 'warning',
        content: deleteAllImg ? 'Want to delete all Image' : 'Want to delete this Image'
    }).then(async res => {
        if (res) {
            if(deleteAllImg) {
                let imagesUploaded = [...data.image.filter(i => i.uploaded)];
                if(imagesUploaded.length > 0) deleteFileFromFirestore(imagesUploaded, 'delete-all')
                setData(prev => { return {...prev, image: []}})
                hiddenInputRef.current.lastChild.value = null
                setProgress(0);
            } else {
                if(item.uploaded) deleteFileFromFirestore(item, 'delete-one')
                setData(prev => { return {...prev, image: prev.image.filter(i => i.id !== item.id)}})
                hiddenInputRef.current.lastChild.value = null
                setProgress(0);
            }
        }
    })
}

handleDeleteImage.prototype = {
    item: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    data: PropTypes.object.isRequired,
    setData: PropTypes.func.isRequired,
    hiddenInputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.any})
    ]),
    setProgress: PropTypes.func
};