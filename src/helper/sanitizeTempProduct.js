import PropTypes from "prop-types";

export const sanitizeTempProduct = (tempProduct) => {
    const {color, ...rest} = tempProduct;
    let temp = [];
    for (let i = 0; i < color.length; i++) {
        const {color: name, ...rest} = color[i];
        debugger
        let img = []
        for (let j = 0; j < color[i].image.length; j++) {
            const {id, url, ...rest} = color[i].image[j]
            img.push({id, url})
            temp.push({image: [...img], color: name})
        }
    }
    return {color: temp, ...rest}
}

sanitizeTempProduct.prototype = {
    tempProduct: PropTypes.object.isRequired
}