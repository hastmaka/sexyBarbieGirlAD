// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    backgroundColor: theme.palette.grey[0],
    borderRadius: '4px',
    boxShadow: theme.shadows[5],
    padding: '10px'
}));

//----------------------------------------------------------------

export default function ChildLocal({children, sx}) {
    return (
        <RootStyle sx={{...sx}}>
            {children}
        </RootStyle>
    );
}
