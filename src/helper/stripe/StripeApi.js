import {createAsyncThunk} from "@reduxjs/toolkit";
export const urlFirebase = 'https://us-central1-sexybarbiegirl-f6068.cloudfunctions.net/app/';
export const urlLocal = 'http://127.0.0.1:5001/sexybarbiegirl-f6068/us-central1/app/';

export const getCustomerData = createAsyncThunk(
    'stripe/getCustomerData',
    async ({path, customer}, {rejectWithValue})  => {
        try {
            let url = new URL(urlFirebase + path);
            url.search = new URLSearchParams({
                customer_id: JSON.stringify(customer.customer_id)
            }).toString();
            const response = await fetch(url);
            return await response.json()
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllShippingOption = createAsyncThunk(
    'stripe/getAllShippingOption',
    async ({path}, {rejectWithValue})  => {
        try {
            const response = await fetch(urlFirebase + path);
            return await response.json()
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);

export const onCheckoutHandler = (user) => {
    fetch(`${urlFirebase}create-checkout-session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user.cart.item),
    })
        .then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        })
        .then(({ url }) => {
            window.location = url
        })
        .catch(e => {
            debugger
            console.error(e.error)
        })
}