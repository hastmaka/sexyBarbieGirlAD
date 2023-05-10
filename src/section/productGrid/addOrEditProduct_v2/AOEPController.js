import {create, update} from "../../../helper/firebase/FirestoreApi";
import {productSliceActions} from "../../../store/productSlice";
import {adminSliceActions} from "../../../store/adminSlice";
import {sanitizeProduct} from "../../../helper";

export const handleProductSave = (tempProduct, editMode) => {
    // const sanitizedProduct = sanitizeProduct(tempProduct, 'to-server');
    if(editMode) {
        window.dispatch(update({
            id: tempProduct.id,
            data: tempProduct,
            collection: 'products'
        }));
    } else {
        window.dispatch(create({collection: 'products', data: tempProduct}));
    }
    window.dispatch(productSliceActions.resetTempProductAndTempProductState())
    window.dispatch(adminSliceActions.closeModal());
}