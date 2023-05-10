import {productSliceActions} from "../../../../store/productSlice";
import {createId, sortArray} from "../../../../helper";
import PropTypes from "prop-types";

export const handleCheckbox = (value, tempProductState) => {
    window.dispatch(
        productSliceActions.updateTempProductState({
            ...tempProductState,
            [value]: !tempProductState[value]
        })
    )
}

export const handleClickVariation = (tempProduct) => {
    const {name, color, size, active, category, description, variation, ...rest} = tempProduct;

    let statistic = {
        average_rating: 0,
        date_on_sale_from: '',
        date_on_sale_to: '',
        sales: {},
        total_review: 0
    };

    let variant = [];
    for (const col of color) {
        for (const siz of size) {
            variant.push({
                id: createId(20),
                price: 0,
                color: col.color,
                size: siz.size,
                stock: 10,
                discount: 0,
                checked: true,
                active: true
            })
        }
    }
    window.dispatch(
        productSliceActions.setTempProduct({
            ...rest,
            active,
            category,
            description,
            name,
            statistic,
            color,
            size,
            variation: sortArray([...variant]),
        })
    )
}

handleCheckbox.prototype = {
    value: PropTypes.string.isRequired,
    tempProductState: PropTypes.object.isRequired
}