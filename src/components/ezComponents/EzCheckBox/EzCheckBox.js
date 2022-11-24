//material
import {Checkbox} from '@mui/material';

const label = { inputProps: { 'aria-label': 'simple_checkbox' } };

export default function EzCheckBox(props) {
    return (
        <Checkbox
            {...label}
            {...props}
            sx={{
                color: theme => theme.palette.ecommerce.inactive_color,
                '&.Mui-checked': {
                    color: theme => theme.palette.ecommerce.checkBox,
                },
            }}
        />
    );
}