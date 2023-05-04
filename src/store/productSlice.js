import {createSlice} from '@reduxjs/toolkit';
import {create, getAll, update, updateProductApi} from "../helper/firebase/FirestoreApi";
import {tempProductState, tempProduct} from "../helper/staticData/StaticData";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
        productState: {loaded: false, loading: false},
        //AOEP
        tempProduct: {
            active: true,
            category: [],
            color: [],
            description: [],
            name: '',
            brandName: '',
            size: [],
            variation: [],
            tags: []
        },
        tempProductState: {
            size: false,
            color: false,
            variation: true,
            productNameModified: false,
            checkProductName: {
                check: false,
                isOnDb: null,
                value: '',
            }
        },
        productInEditMode: {},
        unsavedProduct: [],
    },
    reducers: {
        setTempProduct(state, {payload}){state.tempProduct = payload},
        setProductInEditMode(state, {payload}){state.productInEditMode = payload},
        addImageToColor(state, {payload}) {
            const {data, item} = payload;
            const indexToUpdate = state.tempProduct.color.findIndex(i => i.color === item.color)
            state.tempProduct.color[indexToUpdate].image = [...data]
        },
        updateColorAfterUploadImage(state, {payload}) {
            const {item, res, refs} = payload;
            const indexToUpdate = state.tempProduct.color.findIndex(i => i.color === item.color);
            state.tempProduct.color[indexToUpdate] = {
                ...state.tempProduct.color[indexToUpdate],
                image: [...res],
                refs
            }
            //if it has id the product is in db
            if(!!state.tempProduct.id) updateProductApi(state.tempProduct.id, state.tempProduct)
        },
        updateProduct(state, {payload}) {
            const product = [...state.product];
            const indexToUpdate = product.findIndex(item => item.id === payload.id);
            product[indexToUpdate] = payload;
            state.product = product;
        },

        //AOEP
        updateTempProductState(state, {payload}) {
            state.tempProductState = {...payload}
        },
        resetTempProductAndTempProductState(state, {payload}) {
            state.tempProduct = tempProduct;
            state.tempProductState = tempProductState
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
                case 'tests'://change to products later
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
        //update
        builder.addCase(update.pending, (state, {meta}) => {
            switch (meta.arg.collection) {
                case 'tests'://products
                    state.productState.loading = true;
                    break;
                default:
                    return
            }
        });
        builder.addCase(update.fulfilled, (state, {meta, payload}) => {
            switch (meta.arg.collection) {
                case 'tests'://products
                    const indexToUpdate = state.product.findIndex(i => i.id === meta.arg.id)
                    state.product[indexToUpdate] = {...meta.arg.data}
                    state.productState.loading = false;
                    state.productState.loaded = true;
                    break;
                default:
                    return
            }
        });
        builder.addCase(update.rejected, (state, {meta}) => {
            debugger
            state.message = meta.type;
        });
    },
});

export const productSliceActions = productSlice.actions;
export default productSlice.reducer;
