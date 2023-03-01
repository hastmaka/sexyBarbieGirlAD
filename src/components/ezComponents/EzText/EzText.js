// material
import {Typography} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Typography)(({theme}) => ({
    fontSize: '12px',
    textTransform: 'capitalize',
    // fontWeight: 600,
    // color: theme.palette.ecommerce.inactive_color
}));

//----------------------------------------------------------------

export default function EzText({text, sx, ...rest}) {
    return (
        <RootStyle sx={{...sx}} {...rest} variant='span'>
            {text}
        </RootStyle>
    );
}
