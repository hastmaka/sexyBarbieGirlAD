import PropTypes from "prop-types";
import {deleteFileFromFirestore} from "./deleteFileFromFirestore";
import {productSliceActions} from "../store/productSlice";

/**
 * use case
 * delete one local
 * delete all local
 * delete one firestore
 * delete all firestore
 * @param img - can be an object (in case just want to delete one) or string
 * in case want to delete all
 * @param item - color object to update
 * @param hiddenInputRef - ref to reset input value and prevent bugs
 * @param setProgress
 */
export const handleDeleteImage = (img, item, hiddenInputRef, setProgress) => {
    let deleteAllImg = typeof img === 'string';
    window.confirm({
        type: 'warning',
        content: deleteAllImg ? 'Want to delete all Image' : 'Want to delete this Image'
    }).then(async res => {
        if (res) {
            if(deleteAllImg) {
                let imagesUploaded = [...item.image.filter(i => i.uploaded)];
                if(imagesUploaded.length > 0) deleteFileFromFirestore(imagesUploaded, 'delete-all')
                window.dispatch(productSliceActions.deleteImageFromColor({item, action: 'delete-all'}))
                hiddenInputRef.current.lastChild.value = null
                setProgress(0);
            } else {
                if(img.uploaded) deleteFileFromFirestore(img, 'delete-one')
                window.dispatch(productSliceActions.deleteImageFromColor({img, item, action: 'delete-one'}))
                hiddenInputRef.current.lastChild.value = null
                setProgress(0);
            }
        }
    })
}

handleDeleteImage.prototype = {
    img: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    item: PropTypes.object.isRequired,
    hiddenInputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.any})
    ]),
    setProgress: PropTypes.func
};