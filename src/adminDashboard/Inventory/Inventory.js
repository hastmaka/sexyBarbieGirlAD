// material
import {Box, Checkbox, FormControl, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import {useState} from "react";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    gap: '10px'
}));

//----------------------------------------------------------------

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Inventory() {
    const [age, setAge] = useState('');
    return (
        <RootStyle>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>SKU</Typography>
                <TextField id="outlined-basic" variant="outlined" size='small'/>
            </Stack>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>Manage stock?</Typography>
                <Stack flexDirection='row' alignItems='center'>
                    <Checkbox {...label} />
                    <Typography variant='span'>Manage stock level (quantity)</Typography>
                </Stack>
            </Stack>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>Stock quantity</Typography>
                <TextField id="outlined-basic" variant="outlined" size='small'/>
            </Stack>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>Allow backorders?</Typography>
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
                            <MenuItem value={10}>Do not allow</MenuItem>
                            <MenuItem value={20}>Allow , but notify customer</MenuItem>
                            <MenuItem value={30}>Allow</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Stack>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>Low stock threshold</Typography>
                <TextField id="outlined-basic" placeholder="threshold (2)" variant="outlined" size='small'/>
            </Stack>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>Stock status</Typography>
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
                            <MenuItem value={10}>In Stock</MenuItem>
                            <MenuItem value={20}>Out of Stock</MenuItem>
                            <MenuItem value={30}>On backorder</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Stack>
            <Stack flexDirection='row' alignItems='center' gap='10px'>
                <Typography variant='span'>Sold individually</Typography>
                <Stack flexDirection='row' alignItems='center'>
                    <Checkbox {...label} />
                    <Typography variant='span'>Limit purchases to 1 item per order</Typography>
                </Stack>
            </Stack>
        </RootStyle>
    );
}
