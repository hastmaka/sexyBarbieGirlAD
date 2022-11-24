// material
import {styled} from '@mui/material/styles';
import {LoadingButton} from "@mui/lab";

//----------------------------------------------------------------

const RootStyle = styled(LoadingButton)(({theme}) => ({
    fontSize: '16px',
    color: '#FFF',
    border: '1px solid transparent',
    backgroundColor: theme.palette.ecommerce.pink,
    boxShadow: theme.shadows[0],
    transition: 'all 200ms',
    '&:hover': {
        border: '1px solid transparent',
        backgroundColor: theme.palette.ecommerce.pink,
        boxShadow: theme.shadows[10]
    },
    '& .MuiLoadingButton-loadingIndicator': {
        color: '#FFF'
    }
}));

//----------------------------------------------------------------

export default function EzLoadingBtn({children, sx, onClick, ...other}) {
    return (
        <RootStyle sx={{...sx}} onClick={onClick} {...other}>
            {children}
        </RootStyle>
    );
}
