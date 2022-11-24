export const calcDiscount = (price, discount) => {
    return (price * (100 - discount) / 100).toFixed(2);
}

export const createId = _ => {
    return Date.now() * Math.random()
};

export const handleDecimalsOnValue = (value) => {
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
    return value.match(regex)[0];
};

export const formatSizeArray = (s, i) => {
    return (i ? ', ' : '') + `${s === 1 ? 'XS' : s === 2 ? 'S' : s === 3 ? 'M' : s === 4 ? 'L' : s === 5 ? 'XL' : ''}`
};

export const updateLocalStore = (key, data, to) => {
    if(JSON.parse(localStorage.getItem(key)) === null) {
        localStorage.setItem(key, JSON.stringify({}))
    }
    let temp = JSON.parse(localStorage.getItem(key));

    if (to === 'setUser') {
        localStorage.setItem(key, JSON.stringify(data))
    } else if (to === 'wish_list' || to === 'address' || to === 'orders') {
        temp[to] = [...data]
        localStorage.setItem(key, JSON.stringify(temp))
    } else if (to === 'cart') {
        temp[to] = {...data}
        localStorage.setItem(key, JSON.stringify(temp))
    } else if (to === 'stripe') {
        localStorage.setItem(key, JSON.stringify({...data}))
    }
};

export const cartQuantity = (cart) => {
    let cQuantity = 0,
        sub_total = 0,
        total = 0; //sub_total plus tax and fees
    cart.map(item => {
        cQuantity += item.quantity;
        sub_total += item.quantity * item.price;
        total += item.quantity * item.price;
    });
    return {
        cQuantity,
        sub_total: Number(sub_total.toFixed(2)),
        total: Number(total.toFixed(2))
    };
};

export const updateCart = (cart, payload = null, indexToUpdate = null, q = null) => {
    if (payload !== null) {
        if (!cart.item.length) {
            return {
                ...cart,
                item: [{
                    variation_id: payload.variation.id,
                    product_id: payload.product.product_id,
                    image: payload.product.image[0],
                    price: payload.variation.price,
                    color: payload.variation.color,
                    size: payload.variation.size,
                    name: payload.product.name,
                    quantity: 1,
                }],
                last_update: Date.now(),
                quantity: 1,
                sub_total: payload.variation.price,
                total: payload.variation.price,//plus tax
            }
        } else {
            if (indexToUpdate !== null) {
                cart.item[indexToUpdate] = {
                    ...cart.item[indexToUpdate],
                    quantity: cart.item[indexToUpdate].quantity + q
                }
                const {cQuantity, sub_total, total} = cartQuantity(cart.item);
                return {
                    ...cart,
                    last_update: Date.now(),
                    quantity: cQuantity,
                    sub_total: sub_total,
                    total: total,
                }
            } else {
                const tempCart = {
                    ...cart,
                    item: [...cart.item, {
                        variation_id: payload.variation.id,
                        product_id: payload.product.product_id,
                        image: payload.product.image[0],
                        price: payload.variation.price,
                        color: payload.variation.color,
                        size: payload.variation.size,
                        name: payload.product.name,
                        quantity: 1,
                    }]
                }
                const {cQuantity, sub_total, total} = cartQuantity(tempCart.item);
                return {
                    ...tempCart,
                    last_update: Date.now(),
                    quantity: cQuantity,
                    sub_total: sub_total,
                    total: total,
                }
            }
        }
    } else {
        const {cQuantity, sub_total, total} = cartQuantity(cart.item);
        return {
            ...cart,
            last_update: Date.now(),
            quantity: cQuantity,
            sub_total: sub_total,
            total: total,
        }
    }
};