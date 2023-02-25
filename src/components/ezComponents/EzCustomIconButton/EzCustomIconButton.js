// material
import {IconButton, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(IconButton)(({theme}) => ({
    cursor: 'pointer',
    '& > svg': {
        fill: theme.palette.ecommerce.pink
    },
    '&:hover': {
        backgroundColor: 'transparent',
        '& > svg': {
            fill: theme.palette.ecommerce.swatch_2
        }
    }
}));

//----------------------------------------------------------------

export default function EzCustomIconButton({icon, onClick, size, ariaLabel, toolTipTitle = '', ttPlacement = 'bottom', sx, ...rest}) {
    return (
        <Tooltip title={toolTipTitle} arrow placement={ttPlacement}>
            <RootStyle
                onClick={onClick}
                size={size || ''}
                aria-label={ariaLabel || ''}
                sx={{...sx}}
                {...rest}
            >
                {icon}
            </RootStyle>
        </Tooltip>
    );
}
