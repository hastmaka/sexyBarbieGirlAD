import React, {useState} from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import {styled} from "@mui/material/styles";
import {Box, Stack, Typography} from "@mui/material";
import EzLoadingBtn from "../../ezComponents/EzLoadingBtn/EzLoadingBtn";

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            'color': '#32325d',
            'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
            'fontSmoothing': 'antialiased',
            'fontSize': '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};

const RootStyle = styled(Stack)(({theme}) => ({
    width: '400px',
    // height: '300px',
    padding: '50px 30px 30px 30px'
}))

export default function CardInput({onSubmit}) {
    const [loading, setLoading] = useState(false);
    return (
        <RootStyle>
            <Box component='form' onSubmit={onSubmit}>
                <Stack flexDirection='row' justifyContent='space-between' sx={{marginBottom: '25px'}}>
                    <Typography variant='span'>Card</Typography>
                </Stack>
                <CardElement options={CARD_ELEMENT_OPTIONS}/>
                <EzLoadingBtn
                    sx={{marginTop: '25px'}}
                    color="inherit"
                    size='large'
                    type='submit'
                    variant='outlined'
                    loading={loading}
                >
                    Save Card
                </EzLoadingBtn>
            </Box>
        </RootStyle>
    );
}