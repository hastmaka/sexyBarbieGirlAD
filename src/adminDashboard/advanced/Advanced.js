// material
import {Checkbox, Stack, TextField, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    gap: '10px'
}));

//----------------------------------------------------------------

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Advanced() {
    return (
        <RootStyle>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>Purchase note</Typography>
                <TextField id="outlined-basic" variant="outlined" size='small'/>
            </Stack>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>Menu order</Typography>
                <TextField id="outlined-basic" variant="outlined" size='small'/>
            </Stack>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>Enable reviews</Typography>
                <Stack flexDirection='row' alignItems='center'>
                    <Checkbox {...label} />
                    <Typography variant='span'>Manage stock level (quantity)</Typography>
                </Stack>
            </Stack>
        </RootStyle>
    );
}
