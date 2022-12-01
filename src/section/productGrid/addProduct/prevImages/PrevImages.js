// material
import {Box, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px'
}));

//----------------------------------------------------------------

export default function PrevImages({onClick, urls}) {
    return (
        <RootStyle>
                <Box
                    sx={{
                        margin: '0 auto',
                        display: 'grid',
                        gridGap: '5px 5px',
                        grid: 'auto / repeat(2, 1fr)',
                    }}>
                    {urls.map(url =>
                        <Box
                            onClick={_ => onClick(url)}
                            key={url}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.005)'
                                }}}>
                            <img src={url} alt='preview'/>
                        </Box>
                    )}
                </Box>
        </RootStyle>
    );
}
