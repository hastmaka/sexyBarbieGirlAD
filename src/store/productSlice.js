import {createSlice} from '@reduxjs/toolkit';
import {create, getAll} from "../helper/firebase/FirestoreApi";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
        tempProduct: {},
        unsavedProduct: [],
        productState: {loaded: false, loading: false},
    },
    reducers: {
        setTempProduct(state, {payload}){state.tempProduct = payload},
        addImageToColor(state, {payload}) {
            const {data, item} = payload;
            const indexToUpdate = state.tempProduct.color.findIndex(i => i.color === item.color)
            state.tempProduct.color[indexToUpdate].image = [...data]
        },
        deleteImageFromColor(state, {payload}) {
            const {img, item, action} = payload;
            const indexToUpdate = state.tempProduct.color.findIndex(i => i.color === item.color);
            switch (action) {
                case 'delete-one':
                    const imgUpdated = item.image.filter(i => i.id !== img.id)
                    state.tempProduct.color[indexToUpdate].image = [...imgUpdated];
                    break;
                case 'delete-all':
                    state.tempProduct.color[indexToUpdate].image = []
                    break;
                default:
                    break;
            }

        },
        updateColorAfterUploadImage(state, {payload}) {
            const {item, res, refs} = payload;
            const indexToUpdate = state.tempProduct.color.findIndex(i => i.color === item.color);
            state.tempProduct.color[indexToUpdate] = {
                ...state.tempProduct.color[indexToUpdate],
                image: [...res],
                refs
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

export const productSliceActions = productSlice.actions;
export default productSlice.reducer;
