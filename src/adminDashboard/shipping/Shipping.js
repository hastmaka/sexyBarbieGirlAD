// material
import {Box, FormControl, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import {useState} from "react";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    gap: '10px'
}));

//----------------------------------------------------------------

export default function Shipping() {
    const [age, setAge] = useState('');
    return (
        <RootStyle>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>Weight (kg)</Typography>
                <TextField id="outlined-basic" placeholder='0' variant="outlined" size='small'/>
            </Stack>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>Dimensions (cm)</Typography>
                <TextField id="outlined-basic" placeholder='Length' variant="outlined" size='small'/>
                <TextField id="outlined-basic" placeholder='Width' variant="outlined" size='small'/>
                <TextField id="outlined-basic" placeholder='Height' variant="outlined" size='small'/>
            </Stack>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>Shipping class</Typography>
                <Box sx={{ width: '300px' }}>
                    <FormControl fullWidth variant="standard">
                        <Select
                            id="demo-simple-select"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            sx={{
                                height: '30px'
                            }}
                        >
                            <MenuItem value={10}>No shipping class</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Stack>
        </RootStyle>
    );
}
