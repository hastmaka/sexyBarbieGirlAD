// material
import {TextField} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.grey[400],
        },
        '&:hover fieldset': {
            borderColor: theme.palette.grey[800],
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.grey[800],
            borderWidth: 1,
        },
    },
    '& label.MuiFormLabel-root': {
        color: theme.palette.ecommerce.swatch_2,
    }
}));

//----------------------------------------------------------------

export default function EzTextField({required, ...field}) {
    return (
        <RootStyle
            required
            autoFocus
            {...field}
        />
    );
}
