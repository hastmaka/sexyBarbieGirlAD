// material
import {TextField} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.ecommerce.pink,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.ecommerce.pink,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.ecommerce.pink_3,
            borderWidth: 1,
        },
    },
    '& label.MuiFormLabel-root': {
        color: theme.palette.ecommerce.swatch_2,
    }
}));

//----------------------------------------------------------------

export default function EzTextField({required, autoFocus, ...field}) {
    return (
        <RootStyle
            required
            autoFocus
            {...field}
        >

        </RootStyle>
    );
}
