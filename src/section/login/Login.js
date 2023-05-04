import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// material
import {Box, IconButton, InputAdornment, Stack} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
//
import LoginWrapper from './LoginWrapper';
import EzText from "../../components/ezComponents/EzText/EzText";
import EzTextField from "../../components/ezComponents/EzTextField/EzTextField";
import * as PropTypes from "prop-types";
import EzLoadingBtn from "../../components/ezComponents/EzLoadingBtn/EzLoadingBtn";
import EzButton from "../../components/ezComponents/EzButton/EzButton";
import {btnOutlined} from "../../helper/sx/Sx";
import {loginProcess} from "../../helper";

//dynamic import

function EzCustomSelect(props) {
    return null;
}

EzCustomSelect.propTypes = {
    onChange: PropTypes.func,
    from: PropTypes.string,
    value: PropTypes.string,
    option: PropTypes.any
};
//----------------------------------------------------------------
export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleBtnLoading, setGoogleBtnLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState('uber_and_lyft')

    const onLoginWithGoogle = async () => {
        // setGoogleBtnLoading(true);
        // try {
        //     const googleUser = await import('../../helper/firebase/FirebaseAuthService').then(module => {
        //         return module.loginWithGoogle()
        //     });
        //     const dbUser = await import('../../helper/firebase/FirestoreApi').then(module => {
        //         return module.getUser(googleUser.user.uid)
        //     });
        //     if(!dbUser) {
        //         const res = await import('../../helper/helper').then(module => {
        //             return module.createAccountProcess(googleUser.user)
        //         });
        //         if(res === 'created') {
        //             const dbCurrentUser = await import('../../helper/firebase/FirestoreApi').then(module => {
        //                 return module.getUser(googleUser.user.uid)
        //             });
        //             loginProcess({firebaseUser: googleUser, dbUser: dbCurrentUser, navigate, from: 'google'})
        //         }
        //     } else {
        //         loginProcess({firebaseUser: googleUser, dbUser, navigate, from: 'google'})
        //     }
        // } catch (err) {
        //     if(err.code === 'auth/popup-closed-by-user') {
        //         setGoogleBtnLoading(false)
        //     } else {
        //         window.displayNotification({
        //             t: 'error',
        //             c: 'There is some error with you Google Account'
        //         })
        //     }
        // }
    }

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let email = data.get('email'),
            password = data.get('password');
        setLoading(true);
        const firebaseUser = await import('../../helper/firebase/FirebaseAuthService').then(module => {
            return module.loginUser(email, password)
        });
        if(firebaseUser) {
            const dbUser = await import('../../helper/firebase/FirestoreApi').then(module => {
                return module.getUser(firebaseUser.uid)
            });
            if(!dbUser) {
                window.displayNotification({
                    type: 'error',
                    content: 'Please Check Account Type'
                })
            } else {
                loginProcess({
                    firebaseUser,
                    dbUser,
                    navigate,
                    from: 'emailAndPass'
                })
            }
        }
        setLoading(false);
    }

    return (
        <LoginWrapper>
            <EzText text='Sign in' variant='h4' sx={{textAlign: 'center', margin: '0 20px 10px 20px', fontSize: '1.5rem'}}/>
            <Box component='form' onSubmit={onLoginSubmit}>
                <EzTextField
                    required
                    autoFocus
                    type='email'
                    name='email'
                    label='Email'
                />
                <EzTextField
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    sx={{color: '#999'}}
                                    edge='end'
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <EzCustomSelect
                    option={[{
                        label: 'Uber and Lyft',
                        value: 'uber_and_lyft'
                    }, {
                        label: 'Personal',
                        value: 'personal'
                    }]}
                    value={selectedValue}
                    onChange={e => setSelectedValue(e.target.value)}
                    from='login'
                />
                <EzLoadingBtn
                    sx={{marginTop: '25px'}}
                    fullWidth
                    size='large'
                    type='submit'
                    variant='outlined'
                    loading={loading}
                >
                    Sign in
                </EzLoadingBtn>
                <EzLoadingBtn
                    onClick={onLoginWithGoogle}
                    startIcon={<GoogleIcon/>}
                    fullWidth
                    size='large'
                    variant='outlined'
                    loading={googleBtnLoading}
                >
                    Sign in with Google
                </EzLoadingBtn>
                <Stack flexDirection='row' gap='5px' justifyContent='space-between'>
                    <EzButton
                        sx={{...btnOutlined}}
                        variant='outlined'
                        onClick={() => navigate('/forgot-password')}
                    >
                        Forgot
                    </EzButton>
                    <EzButton
                        sx={{...btnOutlined}}
                        variant='outlined'
                        onClick={() => navigate('/create-account')}
                    >
                        Create
                    </EzButton>
                </Stack>
            </Box>
        </LoginWrapper>
    );
}
