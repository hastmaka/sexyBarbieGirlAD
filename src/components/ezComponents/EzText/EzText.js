// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize',
    color: theme.palette.ecommerce.inactive_color
}));

//----------------------------------------------------------------

export default function EzText({text, sx}) {
    return (
        <RootStyle sx={{...sx}}>
            {text}
        </RootStyle>
    );
}
