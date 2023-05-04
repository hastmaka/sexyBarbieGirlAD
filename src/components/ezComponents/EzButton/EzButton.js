// material
import {Button} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Button)(({theme}) => ({

}));

//----------------------------------------------------------------

export default function EzButton({children, sx, onClick, ...other}) {
    return (
        <RootStyle
            sx={(theme) => ({
                fontSize: '16px',
                padding: '7px 21px',
                // boxShadow: theme.shadows[0],
                transition: 'all 200ms',
                '&:hover': {
                    border: '1px solid transparent',
                    // boxShadow: theme.shadows[10]
                },
                ...sx
            })}
            onClick={onClick}
            {...other}
        >
            {children}
        </RootStyle>
    );
}
