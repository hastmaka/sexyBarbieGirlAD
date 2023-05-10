import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "./firebase/FirebaseConfig";
import PropTypes from "prop-types";
import {getNameFromUrl} from "./getNameFromUrl";
import {productSliceActions} from "../store/productSlice";
import {deepCopy} from "./deepCopy";
import {update} from "./firebase/FirestoreApi";

/**
 * Function to handle upload files to firestore
 * @param item - array of objects with files to upload
 * @param setProgress - to set progress if the operation is success
 * @param editMode - tell me if the upload process comes from editMode to handle the refs
 * @param tempProduct - product in question to update before update state in redux
 */
export const uploadToFirebaseStorage = async (item, setProgress, editMode, tempProduct) => {
    let tempProductDeepCopy = deepCopy(tempProduct),
        //shallow copy
        tempData = [...item.image],
        itemsWithOutUrl = tempData.filter(item => !item.url),
        itemsWithUrl = tempData.filter(item => item.url);
    //check if the image was already uploaded
    const noUploadedImages = item.image.filter(item => !item.uploaded);
    const timeStamp = (editMode && !!item.firebaseStoreRefs) ? item.firebaseStoreRefs : new Date().getTime();
    // const folder_name = item.image[0].File.name.split('.')[0];
    const promises = [];
    noUploadedImages.map((image) => {
        const storageRef = ref(storage, `products/${timeStamp}/${image.File.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image.File);
        promises.push(
            new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Here you can handle the progress of the upload
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Upload is ${progress}% done`);
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        reject(error);
                    },
                    () => {
                        // Handle successful uploads
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve({name: getNameFromUrl(downloadURL), url: downloadURL})
                        });
                    }
                );
            })
        );
    });

    const result = await Promise.all(promises);
    let updateImages = []
    for (let i = 0; i < itemsWithOutUrl.length; i++) {
        for (let j = 0; j < result.length; j++) {
            if(itemsWithOutUrl[i].File.name === result[j].name) {
                updateImages.push({id: itemsWithOutUrl[i].id, url: result[j].url, uploaded: true})
            }
        }
    }
    const indexToUpdate = tempProductDeepCopy.color.findIndex(i => i.color === item.color);
    tempProductDeepCopy.color[indexToUpdate] = {
        ...tempProductDeepCopy.color[indexToUpdate],
        image: !!itemsWithUrl.length ? [...updateImages, ...itemsWithUrl] : [...updateImages],
        firebaseStoreRefs: timeStamp
    }
    // debugger
    window.dispatch(productSliceActions.setTempProduct(tempProductDeepCopy))
    if(!!tempProductDeepCopy.id) {
        window.dispatch(update({
            id: tempProductDeepCopy.id,
            data: tempProductDeepCopy,
            collection: 'products'//products
        }))
    }
};

uploadToFirebaseStorage.prototype = {
    data: PropTypes.array.isRequired,
    setProgress: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
    tempProduct: PropTypes.object.isRequired
}
