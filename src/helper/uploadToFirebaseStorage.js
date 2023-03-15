import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "./firebase/FirebaseConfig";
import PropTypes from "prop-types";

/**
 * Function to handle upload files to firestore
 * @param data - array of objects with files to upload
 * @param setProgress - to set progress if the operation is success
 * @param setData - to update the data once the operation is complete
 */
export const uploadToFirebaseStorage = (data, setProgress, setData) => {
    //shallow copy
    let tempData = [...data];
    //check if the image was already uploaded
    const noUploadedImages = data.filter(item => !item.uploaded);
    const folder_name = data[0].File.name.split('.')[0];
    const promises = [];
    noUploadedImages.map((image) => {
        const storageRef = ref(storage, `products/${folder_name}/${image.File.name}`);
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
                            let name = await import('../helper').then(module => module.getNameFromUrl(url)),
                                indexToUpdate = data.findIndex(i => i.File.name === name);
                            tempData[indexToUpdate] = {...tempData[indexToUpdate], url, uploaded: true};
                            if(tempData.every(i => i.uploaded)) {
                                resolve(tempData)
                            }
                        }).then(res => {
                            setData(prev => { return {...prev, image: res}})
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
    setData: PropTypes.func.isRequired
}