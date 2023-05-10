import PropTypes from "prop-types";
import {capitalize} from "@mui/material";

export const checkValidFields = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (!['id'].includes(key)) {
                //check if the value is a number and is a positive value
                if (['price', 'stock', 'discount'].includes(key)) {
                    if (value === null || value === "") {
                        return {message: `${capitalize(key)} Can't be Empty`};
                    }
                    const testedValue = /^[0-9.]+$/.test(value)
                    if(!testedValue) {
                        return {message: `${capitalize(key)} have to be only positive numbers`};
                    }
                }

                if (value === null || value === "") {
                    return {message: `${capitalize(key)} Can't be Empty`};
                }
            }
        }
    }
    return true;
}

checkValidFields.prototype = {
    obj: PropTypes.object.isRequired
}