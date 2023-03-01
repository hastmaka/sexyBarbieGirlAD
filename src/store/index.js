import {configureStore} from '@reduxjs/toolkit';
import adminSlice from "./adminSlice";
import productSlice from "./productSlice";

const store = configureStore({
    reducer: {
        admin: adminSlice,
        product: productSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;