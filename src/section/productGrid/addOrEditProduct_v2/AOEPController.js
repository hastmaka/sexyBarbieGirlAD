import {create} from "../../../helper/firebase/FirestoreApi";
import {productSliceActions} from "../../../store/productSlice";
import {adminSliceActions} from "../../../store/adminSlice";

export const handleProductSave = (tempProduct) => {
    // const sanitizedProduct = sanitizeTempProduct(tempProduct)
    try{
        window.dispatch(create({collection: 'tests', data: tempProduct}));
        window.dispatch(
            productSliceActions.setTempProduct({
                active: true,
                category: [],
                color: [],
                description: [],
                name: '',
                brandName: '',
                size: [],
                variation: [],
                tags: []
            }
        ));
        window.dispatch(adminSliceActions.closeModal());
    } catch (err) {
        console.log(err);
    }
}

export const handleProductUpdate = (tempProduct) => {
    debugger
}