import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "./firebase/FirebaseConfig";
import PropTypes from "prop-types";
import {getNameFromUrl} from "./getNameFromUrl";
import {productSliceActions} from "../store/productSlice";
import {deepCopy} from "./deepCopy";

/**
 * Function to handle upload files to firestore
 * @param item - array of objects with files to upload
 * @param setProgress - to set progress if the operation is success
 * @param editMode - tell me if the upload process comes from editMode to handle the refs
 * @param tempProduct - product in question to update before update state in redux
 */
export const uploadToFirebaseStorage = (item, setProgress, editMode, tempProduct) => {
    let tempProductDeepCopy = deepCopy(tempProduct),
        //shallow copy
        tempData = [...item.image];
    //check if the image was already uploaded
    const noUploadedImages = item.image.filter(item => !item.uploaded);
    const timeStamp = new Date().getTime();
    // const folder_name = item.image[0].File.name.split('.')[0];
    const promises = [];
    noUploadedImages.map((image) => {
        const storageRef = ref(storage, `products/${editMode ? item.refs : timeStamp}/${image.File.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image.File);
        promises.push(uploadTask);
        uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgress(progress)
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        return new Promise(async (resolve, reject) => {
                            //here we get the name to include the url in the correct file
                            if(editMode) {
                                let itemsWithOutUrl = tempData.filter(item => !item.url),
                                    itemsWithUrl = tempData.filter(item => item.url),
                                    name = getNameFromUrl(url),
                                    indexToUpdate = itemsWithOutUrl.findIndex(i => i.File.name === name);
                                itemsWithOutUrl[indexToUpdate] = {id: itemsWithOutUrl[indexToUpdate].id, url, uploaded: true};
                                if(itemsWithOutUrl.every(i => i.uploaded)) {
                                    resolve([...itemsWithOutUrl, ...itemsWithUrl])
                                }
                            } else {
                                let name = getNameFromUrl(url),
                                    indexToUpdate = item.image.findIndex(i => i.File.name === name);
                                tempData[indexToUpdate] = {id: tempData[indexToUpdate].id, url, uploaded: true};
                                if(tempData.every(i => i.uploaded)) {
                                    resolve(tempData)
                                }
                            }
                        }).then(res => {
                            debugger
                            window.dispatch(
                                productSliceActions.updateColorAfterUploadImage({
                                    res,
                                    item,
                                    refs: timeStamp
                                })
                            )
                        })
                    })
            }
        );
    });

    Promise.race(promises)
        .then()
        .catch((err) => console.log(err));
};

uploadToFirebaseStorage.prototype = {
    data: PropTypes.array.isRequired,
    setProgress: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
    tempProduct: PropTypes.object.isRequired
}
