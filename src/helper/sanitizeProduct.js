import PropTypes from "prop-types";

export const sanitizeProduct = (tempProduct, action) => {
    if(action === 'to-sever') {
        const {color, size, ...rest} = tempProduct;
        return {
            ...rest,
            image: [...color],
            sizeChart: [...size]
        }
    } else if(action === 'to-local') {
        const {image, sizeChart, ...rest} = tempProduct;
        return {
            ...rest,
            color: [...image],
            size: [...sizeChart]
        }
    }
}

sanitizeProduct.prototype = {
    tempProduct: PropTypes.object.isRequired,
    action: PropTypes.string.isRequired
}