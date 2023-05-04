// material
import {Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
//

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({modal, theme}) => ({
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: modal === 'true' ? '' : '100vh',
    // background: `url(${backgroundImage})`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat',
    // backdropFilter: 'blur(1px)'
}));

const FormContainer = styled(Stack)(({theme}) => ({
    boxShadow: theme.shadows[4],
    borderRadius: 2,
    padding: '30px',
    width: '330px',
    backgroundColor: theme.palette['childBg'],
    '& form': {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    }
}));

//----------------------------------------------------------------

export default function LoginWrapper({children}) {
    // debugger
    return (
        <RootStyle>
            <FormContainer>
                {children}
            </FormContainer>
        </RootStyle>
    );
}
