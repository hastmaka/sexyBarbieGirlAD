import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "./firebase/FirebaseConfig";
import PropTypes from "prop-types";

/**
 * update filter in db every time a product is created
 * @param product
 * @returns {Promise<void>}
 */
export const updateFilter = async (product) => {
    const {size, color, price, category} = product;


    try{
        let filter = {};
        const response = await getDocs(collection(db, 'filters'));
        response.docs.map(doc => {filter = {...doc.data()}});

        if(!!filter.color && filter.color.length) {
            const newColor = color.filter(fColor => !filter.color.some(color => fColor === color.name))
            if(newColor.length) {
                newColor.map(color => filter.color.push({name: color, checked: false}))
            }
        } else {
            filter.color = [];
            color.map(color => filter.color.push({name: color, checked: false}))
        }

        if(!!filter.size && filter.size.length) {
            const newSize = size.filter(fSize => !filter.size.some(size => fSize === size.name))
            if(newSize.length) {
                newSize.map(size => filter.size.push({name: size, checked: false}))
            }
        } else {
            filter.size = [];
            size.map(size => filter.size.push({name: size, checked: false}))
        }

        if(!!filter.priceRange && filter.priceRange.length) {
            filter.priceRange[0] = price < filter.priceRange[0] ? price : filter.priceRange[0];
            filter.priceRange[1] = price > filter.priceRange[1] ? price : filter.priceRange[1];
        } else {
            filter.priceRange = [price, price];
        }

        if(!!filter.category && filter.category.length) {
            const newCategory = category.filter(fCategory => !filter.category.some(category => fCategory === category.name))
            if(newCategory.length) {
                newCategory.map(category => filter.category.push({name: category, checked: false}))
            }
        } else {
            filter.category = [];
            category.map(category => filter.category.push({name: category, checked: false}))
        }

        await setDoc(doc(db, 'filters', 'filters'), filter, {merge: true});
    } catch (err) {
        console.log(err);
    }
};

updateFilter.prototype = {
    product: PropTypes.shape({
        size: PropTypes.array.isRequired,
        color: PropTypes.array.isRequired,
        category: PropTypes.array.isRequired,
        price: PropTypes.number.isRequired
    })
}