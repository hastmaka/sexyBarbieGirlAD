import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
// material
import {Box, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import {createId} from "../../../helper/Helper";
import {userSliceActions} from "../../../store/userSlice";
import EzLoadingBtn from "../../ezComponents/EzLoadingBtn/EzLoadingBtn";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    gap: '15px',
    padding: '30px',
    '& form': {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: '15px',
        '& .MuiInputBase-root:after': {
            borderBottom: `1px solid ${theme.palette.ecommerce.swatch_2}`,
            // '& ::hover::before': {
            //     borderBottom: `1px solid ${theme.palette.ecommerce.gold}`,
            // }
        },
        '& .MuiInput-input': {
            '&::placeholder': {
                color: '#dedede'
            },
        }
    }
}));

//----------------------------------------------------------------

export default function AddressForm({type, data, afterSubmit}) {
    const {user} = useSelector(slice => slice.user)
    const [loading, setLoading] = useState(false);
    const [addData, setAddData] = useState({});
    const title = type === 'edit' ? 'Save' : type === 'create' ? 'Create' : '';

    // debugger
    console.log('render')
    useEffect(_ => {
        setAddData(data || {
            first_name: '',
            last_name: '',
            phone: '',
            country: '',
            address: '',
            city: '',
            state: '',
            zip: ''
        })
    }, [data]);

    const onChangeHandler = (e) => {
        setAddData({...addData, [e.target.name]: e.target.value})
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        let data = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            phone: formData.get('phone'),
            country: formData.get('country'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip')
        }
        debugger

        if(type === 'edit') {
            window.dispatch(userSliceActions.editAddress({...data}));
        } else {
            window.dispatch(userSliceActions.addAddress({
                ...data,
                main: !user.address.length,
                id: createId()
            }));
        }
        afterSubmit(false)
        setLoading(false)
    }

    return (
        <RootStyle >
            <Typography
                variant='span'
                sx={{
                    marginBottom: '25px',
                    color: theme => theme.palette.ecommerce.swatch_2
                }}
            >{title}</Typography>
            {Object.keys(addData).length && <Box component='form' onSubmit={e => handlerSubmit(e, addData)}>
                <TextField
                    value={addData.first_name}
                    onChange={onChangeHandler}
                    variant='standard'
                    size='small'
                    name='first_name'
                    placeholder='First Name'
                    autoFocus
                />
                <TextField
                    value={addData.last_name}
                    onChange={onChangeHandler}
                    required
                    variant='standard'
                    size='small'
                    name='last_name'
                    placeholder='Last Name'
                />
                <TextField
                    value={addData.phone}
                    onChange={onChangeHandler}
                    required
                    // type='number'
                    variant='standard'
                    size='small'
                    name='phone'
                    placeholder='Phone'
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+1</InputAdornment>,
                    }}
                />
                <TextField
                    value={addData.country}
                    onChange={onChangeHandler}
                    required
                    variant='standard'
                    size='small'
                    name='country'
                    placeholder='Country'
                />
                <TextField
                    value={addData.address}
                    onChange={onChangeHandler}
                    required
                    variant='standard'
                    size='small'
                    name='address'
                    placeholder='Address'
                />
                <TextField
                    value={addData.city}
                    onChange={onChangeHandler}
                    required
                    variant='standard'
                    size='small'
                    name='city'
                    placeholder='City'
                />
                <TextField
                    value={addData.state}
                    onChange={onChangeHandler}
                    required
                    variant='standard'
                    size='small'
                    name='state'
                    placeholder='State'
                />
                <TextField
                    value={addData.zip}
                    onChange={onChangeHandler}
                    required
                    type='number'
                    variant='standard'
                    size='small'
                    name='zip'
                    placeholder='Zip'
                />

                <EzLoadingBtn
                    sx={{marginTop: '25px'}}
                    color="inherit"
                    size='large'
                    type='submit'
                    variant='outlined'
                    loading={loading}
                >
                    {title}
                </EzLoadingBtn>
            </Box>}
        </RootStyle>
    );
}
