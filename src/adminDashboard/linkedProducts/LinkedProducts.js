// material
import {Stack, TextField, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    gap: '10px'
}));

//----------------------------------------------------------------

export default function LinkedProducts() {
    return (
        <RootStyle>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>Upsells</Typography>
                <TextField id="outlined-basic" variant="outlined" size='small'/>
            </Stack>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>Cross-sells</Typography>
                <TextField id="outlined-basic" variant="outlined" size='small'/>
            </Stack>
        </RootStyle>
    );
}
