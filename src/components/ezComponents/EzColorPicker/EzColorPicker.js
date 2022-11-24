// material
import {Box, Stack, Tooltip} from '@mui/material';
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({checked, theme}) => ({
    cursor: 'pointer',
    border: checked ? `2px solid ${'#999'}` : '2px solid transparent',
    borderRadius: '19px',
    width: '35px',
    display: 'inline-block',
    transition: 'all 200ms',
    '&:hover': {
        border: `2px solid ${'#999'}`,
    }
}));

const Inner = styled(Box)(({color, rest, theme}) => ({
    backgroundColor: color,
    borderRadius: '15px',
    margin: '3px',
    height: rest?.height ?? '25px',
    width: rest?.width ?? '25px',
}));

//----------------------------------------------------------------

export default function EzColorPicker({borderColor, backgroundColor, onClick, checked, ...rest}) {
    return (
        <Tooltip title={backgroundColor} sx={{'& .MuiTooltip-popper': {textTransform: 'capitalize'}}}>
            {(rest.width && rest.height) ?
                <Inner color={backgroundColor} rest={rest}/> :
                <RootStyle
                    checked={checked}
                    onClick={_ => onClick(backgroundColor, checked)}
                >
                    <Inner color={backgroundColor}/>
                </RootStyle>
            }
        </Tooltip>
    );
}
