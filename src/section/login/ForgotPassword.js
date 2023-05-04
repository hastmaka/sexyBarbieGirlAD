import {useState} from "react";
import {useNavigate} from 'react-router-dom';
//material
import {Box, Typography} from '@mui/material';
//
import LoginWrapper from './LoginWrapper';
import EzText from "../../components/ezComponents/EzText/EzText";
import EzTextField from "../../components/ezComponents/EzTextField/EzTextField";
import EzLoadingBtn from "../../components/ezComponents/EzLoadingBtn/EzLoadingBtn";
import EzButton from "../../components/ezComponents/EzButton/EzButton";

//--------------------------------------------------------


export default function ForgotPassword(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onForgotHandle = async (e) => {
        // e.preventDefault();
        // const data = new FormData(e.currentTarget);
        // let email = data.get('email');
        // setLoading(true)
        // try {
        //     import('../../helper/FirebaseAuthService').then(module => {
        //         module.passwordResetEmail(email)
        //     })
        //     window.displayNotification({
        //         t: 'info',
        //         c: 'An email was sent to you email addressAndPayment, with instruction to reset your password'
        //     })
        //     navigate('/login');
        //     setLoading(false)
        // } catch (err) {
        //     window.displayNotification({
        //         t: 'info',
        //         c: err.message
        //     })
        //     setLoading(false)
        // }
    }

    return (
        <LoginWrapper>
            <EzText text='Forgot Password' variant='h4' sx={{textAlign: 'center', margin: '0 20px 20px 20px', fontSize: '1.5rem'}}/>
            <Box component='form' onSubmit={onForgotHandle}>

                <Typography component={'span'} sx={{wordWrap: 'break-word', textAlign: 'center'}}>
                    Please enter your email and we send it back to you a recover email.
                </Typography>

                <EzTextField required name='email' type='email' label='Email address'/>

                <EzLoadingBtn
                    sx={{marginTop: '25px'}}
                    fullWidth
                    size='large'
                    type='submit'
                    variant='outlined'
                    loading={loading}
                >
                    Send
                </EzLoadingBtn>

                <EzButton
                    sx={{
                        padding: '8px 22px',
                        height: '48px'
                    }}
                    variant='outlined'
                    color='error'
                    onClick={() => navigate('/login')}
                >Cancel</EzButton>

            </Box>
        </LoginWrapper>
    );
}