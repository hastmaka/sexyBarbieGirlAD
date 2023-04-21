import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    addDoc,
    collection as firestoreCollection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
    writeBatch,
    limit
} from "firebase/firestore";
import {db} from "./FirebaseConfig";

export const create = createAsyncThunk(
    'firestore/create',
    async ({collection, data}, {rejectWithValue})  => {
        try {
            const res = await addDoc(firestoreCollection(db, collection), data);
            window.displayNotification({type: 'info', content: 'Product Created Successfully'})
            return res.id;
        } catch (err) {
            debugger
            window.displayNotification({type: 'error', content: `There was some error ${err.response.data}`})
            return rejectWithValue(err.response.data);
        }
    }
);

export const update = createAsyncThunk(
    'firestore/update',
    async ({id, collection, data}, {rejectWithValue})  => {
        // let {variation, images, ...rest} = data;
        // images = JSON.stringify(images);
        // variation = JSON.stringify(variation);
        // let tempData = {...rest, images, variation}
        debugger
        try {
            await setDoc(doc(firestoreCollection(db, collection), id), data, {merge: true})
                .then(res => {
                    debugger
                }).catch(err => {
                    console.log(err);
                })
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);

export const getById = createAsyncThunk(
    'firestore/getById',
    async ({id, collection}, {rejectWithValue})  => {
        try {
            const data = await getDoc(doc(db, collection, id));
            if (!data.data()) {debugger}//if the user doesn't exist
            if(collection === 'product') {
                return {...data.data(), id: id}
            }
            return data.data();
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAll = createAsyncThunk(
    'firestore/getAll',
    async ({collection, filters = [], lim = null}, {rejectWithValue})  => {
        let queries = [];
        if (filters.length) {
            for (const filter of filters) {
                queries.push(where(filter.field, filter.operator, filter.value));
            }
        }
        const collectionRef = firestoreCollection(db, collection)
        let q = query(collectionRef, ...queries);
        if (lim !== null) {
            q = query(collectionRef, ...queries, limit(lim));
        }
        try {
            let data = collection === 'stripe_customers' ? {} : [];
            let res = await getDocs(q);
            res.docs.map(doc => {
                collection === 'stripe_customers' ?
                    data = {...doc.data(),id: doc.id} :
                    data.push({...doc.data(),id: doc.id});
            })
            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const updateProductApi = (id, product) => {
    try {
        setDoc(doc(firestoreCollection(db, 'products'), id), product, {merge: true})
            .then(_ => {
                window.displayNotification({type: 'info', content: 'Product Updated Successfully'})
            })
    } catch (err) {
        debugger
        window.displayNotification({type: 'error', content: `There was some error ${err}`})
        console.log(err);
    }
};

export const checkProductNameApi = async (name) => {
    const productRef = firestoreCollection(db, 'tests')//products
    const q = query(productRef, where('name', '==', name))
    try {
        const querySnapshot = await getDocs(q)
        return querySnapshot.empty
    } catch (err) {
        debugger
        window.displayNotification({type: 'error', content: `There was some error ${err}`})
        console.log(err);
    }
};

//Test with Dummy data
export const uploadDummyData = async (data) => {
    debugger
    try {
        const collectionRef = firestoreCollection(db, 'tests');
        const batch = writeBatch(db);

        data.forEach((item) => {
            const docRef = doc(collectionRef);
            batch.set(docRef, item);
        });

        await batch.commit();
    } catch (err) {
        console.error(err);
    }
}

export const getDummyData = async (searchParams, setData) => {
    try {
        const data = [];
        if(Object.keys(searchParams).length) {
            const querySnapshot = await getDocs(
                query(
                    firestoreCollection(db, 'tests'),
                    where('tags', 'array-contains', searchParams)
                )
            );
            querySnapshot.docs.map(doc => {
                data.push({...doc.data(), id: doc.id})
            })
        } else {
            const querySnapshot = await getDocs(firestoreCollection(db, 'tests'));
            querySnapshot.docs.map(doc => {
                data.push({...doc.data(), id: doc.id})
            })
        }
        return setData(data);
    } catch (err) {
        debugger
    }
}

export const searchByTags = async () => {

}



