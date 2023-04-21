import { useEffect, useState } from 'react';
import PropTypes from "prop-types";

export default function useCheckProductName(data) {
    const [checkProductName, setCheckProductName] = useState({
        check: false,
        isOnDb: null,
        value: '',
    });

    useEffect(() => {
        if (checkProductName.value !== '') {
            if (checkProductName.value !== data.name) {
                setCheckProductName((prev) => ({
                    ...prev,
                    check: false,
                    isOnDb: null,
                    value: '',
                }));
            }
        }

        if (data.name === '') {
            setCheckProductName((prev) => ({
                ...prev,
                check: false,
                isOnDb: null,
                value: '',
            }));
        }
    }, [checkProductName.value, data.name]);

    return [checkProductName, setCheckProductName];
}

useCheckProductName.prototype = {
    data: PropTypes.object.isRequired
}