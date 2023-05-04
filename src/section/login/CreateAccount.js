import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// material
import {Box, IconButton, InputAdornment} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
//
import LoginWrapper from './LoginWrapper';
import EzText from "../../components/ezComponents/EzText/EzText";
import EzTextField from "../../components/ezComponents/EzTextField/EzTextField";
import EzLoadingBtn from "../../components/ezComponents/EzLoadingBtn/EzLoadingBtn";
import EzButton from "../../components/ezComponents/EzButton/EzButton";

//----------------------------------------------------------------
export default function CreateAccount() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    // debugger

    const onCreateAccountSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let email = data.get('email'),
            password = data.get('password'),
            confirmPassword = data.get('confirmPassword');
        if(password !== confirmPassword) {
            return window.displayNotification({
                type: 'warning',
                content: `Password doesn't match, double check Caps Lock`
            })
        } else if (password.length < 6) {
            return window.displayNotification({
                type: 'warning',
                content: `Password has to be at least 6 characters`
            })
        } else {
            setLoading(true)
            const user = await import('../../helper/firebase/FirebaseAuthService').then(module => {
                return module.registerUser(email, password)
            })
            if(!!user) {
                const dbUser = await import('../../helper').then(module => {
                    return module.createAccountProcess({user})
                });
                if(dbUser === 'created') {
                    window.displayNotification({
                        type: 'success',
                        content: 'Account created successfully, now can Sign in'
                    });
                    navigate('/login')
                } else {
                    window.displayNotification({
                        type: 'info',
                        content: 'Error while creating the account'
                    })
                }
            }
            setLoading(false)
        }
    }

    return (
        <LoginWrapper>
            <EzText text='Sign up' variant='h4' sx={{textAlign: 'center', margin: '0 20px 10px 20px', fontSize: '1.5rem'}}/>
            <Box component='form' onSubmit={onCreateAccountSubmit}>
                <EzTextField required type='email' name='email' label='Email address' autoFocus/>
                <EzTextField
                    required
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    sx={{
                                        color: '#999'
                                    }}
                                    edge='end'
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <EzTextField
                    required
                    name='confirmPassword'
                    label='Confirm Password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    sx={{
                                        color: '#999'
                                    }}
                                    edge='end'
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {/*<EzCustomSelect*/}
                {/*    option={[{*/}
                {/*        label: 'Uber and Lyft',*/}
                {/*        value: 'uber_and_lyft'*/}
                {/*    }, {*/}
                {/*        label: 'Personal',*/}
                {/*        value: 'personal'*/}
                {/*    }]}*/}
                {/*    value={selectedValue}*/}
                {/*    onChange={e => setSelectedValue(e.target.value)}*/}
                {/*    from='create-account'*/}
                {/*/>*/}
                <EzLoadingBtn
                    sx={{marginTop: '25px'}}
                    fullWidth
                    size='large'
                    type='submit'
                    variant='outlined'
                    loading={loading}
                >
                    Create
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
