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
            //get the update data from the server
            window.dispatch(getAll({collection: 'products', filter: null, lim: null}))
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
    async ({id, data, collection}, {rejectWithValue})  => {
        try {
            await setDoc(doc(firestoreCollection(db, collection), id), data, {merge: true})
            return window.displayNotification({
                type: 'success',
                content: `Images deleted Successfully`
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
    try {                                     //products
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
    const productRef = firestoreCollection(db, 'products')//products or tests
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
        const collectionRef = firestoreCollection(db, 'products');
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
                    firestoreCollection(db, 'products'),
                    where('tags', 'array-contains', searchParams)
                )
            );
            querySnapshot.docs.map(doc => {
                data.push({...doc.data(), id: doc.id})
            })
        } else {
            const querySnapshot = await getDocs(firestoreCollection(db, 'products'));
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


export const getUser = (uid) => {
    return new Promise(async (resolve, reject) => {
        try{
            const user = await getDoc(doc(db, 'admin_dashboard_users', uid))
            if(user.exists()) {
                resolve({...user.data(), uid: user.id})
            } else {
                resolve(false)
            }
        } catch (err) {
            reject(err)
        }
    })
}


