// material
import {IconButton, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(IconButton)(({theme}) => ({
    cursor: 'pointer',
    '& > svg': {
        fill: theme.palette.grey[0]
    },
    '&:hover': {
        backgroundColor: 'transparent',
        '& > svg': {
            fill: theme.palette.ecommerce.swatch_2
        }
    }
}));

//----------------------------------------------------------------

export default function EzIconButton({icon, onClick, size, ariaLabel, toolTipTitle = '', ttPlacement = 'bottom', sx, ...field}) {
    return (
        <Tooltip title={toolTipTitle} arrow placement={ttPlacement}>
            <RootStyle
                onClick={onClick}
                size={size || ''}
                aria-label={ariaLabel || ''}
                sx={{...sx}}
                {...field}
            >
                {icon}
            </RootStyle>
        </Tooltip>
    );
}
