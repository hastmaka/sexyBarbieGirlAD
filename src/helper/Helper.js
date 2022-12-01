import {deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable, getMetadata} from "firebase/storage";
import {storage} from './FirebaseConfig';

export const createId = _ => {
    return Date.now() * Math.random()
};

export const handleDecimalsOnValue = (value) => {
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
    return value.match(regex)[0];
};

export const SortArray = (array) => {
    const compare = (a, b) => {
        if (a.color > b.color) return 1;
        if (a.color < b.color) return -1;
        return 0
    }
    return array.sort(compare)
};

export const uploadToFirebaseStorage = (data, action, setProgress, setUrl) => {
    const folder_name = data[0].name.split('.')[0];
    const promises = [];
    data.map((image) => {
        const storageRef = ref(storage, `products/${folder_name}/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        promises.push(uploadTask);
        uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        setUrl((prevState) => [...prevState, url]);
                    });
            }
        );
    });

    Promise.all(promises)
        .then()
        .catch((err) => console.log(err));
}

export const deleteFileFromFirebaseStore = (item, image, setImage, url, setUrl, setProgress) => {
    const storage = getStorage();
    if(!item) {
        //want to delete all db files from this folder
        let promises = [];
        url.map(item => promises.push(deleteObject(ref(storage, item))))
        Promise.all(promises)
            .then(_ => {
                setImage([]);
                setUrl([]);
                setProgress(0);
                return window.displayNotification({
                    title: 'Done',
                    type: 'success',
                    content: `Images deleted Successfully`
                })
            })
            .catch(err => {
            return window.displayNotification({
                title: 'Error',
                type: 'error',
                content: `There was a Error deleting Images ${err}`
            })
        })
    } else {
        window.confirm({type: 'warning', content: 'Want to delete this img'})
            .then(res => {
                if (res) {
                    //local
                    if(!url.length) {
                        let updatedImg = image.filter(i => i !== item);
                        setImage(updatedImg);
                        window.displayNotification({
                            type: 'info',
                            content: `Image ${item.name} Deleted Successfully`
                        })
                    } else {
                        //firebase storage
                        try {
                            getMetadata(ref(storage, item))
                                .then(res => {
                                    let updatedImg = image.filter(i => i.name !== res.name);
                                    setImage(updatedImg);
                                })
                        } catch (err) {
                            return window.displayNotification({
                                title: 'Error',
                                type: 'error',
                                content: `There was a Error getting the Metadata ${err}`
                            })
                        }
                        let actualUrl = url.filter(i => i !== item);
                        setUrl(actualUrl);
                        deleteObject(ref(storage, item))
                            .then(_ => {
                                window.displayNotification({
                                    title: 'Done',
                                    type: 'info',
                                    content: 'Image Deleted Successfully'
                                })
                            }).catch(err => console.log(`Error deleting from firestore storage ${err}`))
                    }

                }
            })
    }
}