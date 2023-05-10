import PropTypes from "prop-types";
import {deleteFileFromFirestore} from "./deleteFileFromFirestore";
import {productSliceActions} from "../store/productSlice";
import {update} from "./firebase/FirestoreApi";
import {deepCopy} from "./deepCopy";

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
 * @param setProgress - function to update the progress  bar
 * @param tempProduct - product in question to update before update state in redux
 */
export const handleDeleteImage = (img, item, hiddenInputRef, setProgress, tempProduct) => {
    let tempProductDeepCopy = deepCopy(tempProduct),
        //find the color in tempProduct
        indexToUpdate = tempProductDeepCopy.color.findIndex(i => i.color === item.color),
        deleteAllImg = typeof img === 'string';
    window.confirm({
        type: 'warning',
        content: deleteAllImg ? 'Want to delete all Image' : 'Want to delete this Image'
    }).then(async res => {
        if (res) {
            if(deleteAllImg) {
                //check all images that was uploaded
                let imagesUploaded = [...item.image.filter(i => i.uploaded)];
                //delete the images from firebase store
                if(imagesUploaded.length > 0) deleteFileFromFirestore(imagesUploaded, 'delete-all')
                //update local
                tempProductDeepCopy.color[indexToUpdate] = {
                    color: tempProductDeepCopy.color[indexToUpdate].color,
                    hex: tempProductDeepCopy.color[indexToUpdate].hex,
                    image: []
                }
            } else {
                //if only one remains have to delete the refs
                if(item.image.length === 1) {
                    tempProductDeepCopy.color[indexToUpdate] = {
                        color: tempProductDeepCopy.color[indexToUpdate].color,
                        hex: tempProductDeepCopy.color[indexToUpdate].hex,
                        image: []
                    }
                } else {
                    //update images inside color
                    const imgUpdated = item.image.filter(i => i.id !== img.id);
                    //update the color
                    tempProductDeepCopy.color[indexToUpdate].image = [...imgUpdated];
                }
                //delete the img from firebase store
                if(img.uploaded) deleteFileFromFirestore(img, 'delete-one')
            }
            //update redux store
            window.dispatch(productSliceActions.setTempProduct(tempProductDeepCopy));
            //update db if existed id
            if(!!tempProductDeepCopy.id) {
                window.dispatch(update({
                    id: tempProductDeepCopy.id,
                    data: tempProductDeepCopy,
                    collection: 'products'//products
                }))
            }
            //reset input refs to accept more files
            hiddenInputRef.current.lastChild.value = null
            //update progress
            setProgress(0);
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
    setProgress: PropTypes.func,
    tempProduct: PropTypes.object.isRequired
};