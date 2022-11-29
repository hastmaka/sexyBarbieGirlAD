import {createSlice} from '@reduxjs/toolkit';
import {create, getAll} from "../helper/FirestoreApi";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        screen: '',
        product: [],
        user: {},

        notification: {
            open: false,
            type: 'info',
            title: '',
            content: '',
            timeout: 0
        },
        confirmDialog: {
            open: false,
            type: '',
            title: '',
            content: '',
        },

        productState: {loaded: false, loading: false},
        userStatus: {loaded: false, loading: false},
    },
    reducers: {
        setScreen(state, {payload}) {
            state.screen = payload
        },

        showNotification(state, {payload}) {
            state.notification = {
                ...state.notification,
                open: true,
                timeout: payload.important ? 10000 : 3000,
                ...payload
            }
        },
        closeNotification(state) {
            state.notification = {
                ...state.notification,
                open: false
            }
        },
        showConfirmDialog(state, {payload}) {
            state.confirmDialog = {
                ...state.confirmDialog,
                open: true,
                ...payload
            }
        },
        closeConfirmDialog(state) {
            state.confirmDialog = {
                ...state.confirmDialog,
                open: false,
            }
        },
        updateProduct(state, {payload}) {
            const product = [...state.product];
            const indexToUpdate = product.findIndex(item => item.id === payload.id);
            product[indexToUpdate] = payload;
            state.product = product;
        }
    },
    extraReducers: (builder) => {
        //getAll
        builder.addCase(getAll.pending, (state, {meta}) => {
            switch (meta.arg.collection) {
                case 'products':
                    state.productState.loading = true;
                    break;
                default:
                    return
            }
        });
        builder.addCase(getAll.fulfilled, (state, {meta, payload}) => {
            switch (meta.arg.collection) {
                case 'products':
                    state.product = payload;
                    state.productState.loading = false;
                    state.productState.loaded = true;
                    break;
                default:
                    return
            }
        });
        builder.addCase(getAll.rejected, (state, {meta}) => {
            debugger
            state.message = meta.type;
        });
        //create
        builder.addCase(create.pending, (state, {meta}) => {
            switch (meta.arg.collection) {
                case 'products':
                    state.productState.loading = true;
                    break;
                default:
                    return
            }
        });
        builder.addCase(create.fulfilled, (state, {meta, payload}) => {
            switch (meta.arg.collection) {
                case 'products':
                    state.product = [...state.product, {...meta.arg.data, id: payload}];
                    state.productState.loading = false;
                    state.productState.loaded = true;
                    break;
                default:
                    return
            }
        });
        builder.addCase(create.rejected, (state, {meta}) => {
            debugger
            state.message = meta.type;
        });
    },
});

export const adminSliceActions = adminSlice.actions;
export default adminSlice.reducer;
