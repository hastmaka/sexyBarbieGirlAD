// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function EzHelpText({alignment, text, sx, top, ...other}) {
    return (
        <RootStyle
            sx={{
                alignItems:
                    alignment === 'center' ? 'center' :
                    alignment === 'left' ? 'flex-start' :
                    alignment === 'right' ? 'flex-end' : ''
            }}
        >
            <Typography
                sx={{
                    fontSize: '10px',
                    position: 'relative',
                    marginTop: top ? `${top}px` : '-12px',
                    ...sx
                }}
                {...other}
            >
                {text}
            </Typography>
        </RootStyle>
    );
}
