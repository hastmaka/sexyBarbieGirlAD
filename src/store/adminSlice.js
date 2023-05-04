import {createSlice} from '@reduxjs/toolkit';
import {create, getAll} from "../helper/firebase/FirestoreApi";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        order: [],
        user: {},

        modal: {
            open: false,
            who: null
        },
        notification: {
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
        orderState: {loaded: false, loading: false},
        userStatus: {loaded: false, loading: false},
    },
    reducers: {
        setUser(state, {payload}) {
            state.user = {...payload}
            state.userStatus.loaded = true;
        },
        openModal(state, {payload}) {
            state.modal.open = true;
            state.modal.who = payload
        },
        closeModal(state){state.modal.open = false},

        showNotification(state, {payload}) {
            state.notification = {
                ...state.notification,
                open: true,
                timeout: payload.important ? 10000 : 3000,
                ...payload
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
    },
    extraReducers: (builder) => {
        //getAll
        builder.addCase(getAll.pending, (state, {meta}) => {
            switch (meta.arg.collection) {
                case 'orders':
                    state.orderState.loading = true;
                    break;
                default:
                    return
            }
        });
        builder.addCase(getAll.fulfilled, (state, {meta, payload}) => {
            switch (meta.arg.collection) {
                case 'orders':
                    state.order = payload;
                    state.orderState.loading = false;
                    state.orderState.loaded = true;
                    break;
                default:
                    return
            }
        });
        builder.addCase(getAll.rejected, (state, {meta}) => {
            debugger
            state.message = meta.type;
        });
    },
});

export const adminSliceActions = adminSlice.actions;
export default adminSlice.reducer;


























