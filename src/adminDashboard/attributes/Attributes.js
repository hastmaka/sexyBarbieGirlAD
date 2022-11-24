// material
import {Button, FormControl, MenuItem, Select, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {useState} from "react";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------
const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export default function Attributes() {
    const [age, setAge] = useState('');
    const handleChange = () => {

    }
    return (
        <RootStyle>
            <Stack flexDirection='row' gap='10px'>
                <FormControl sx={{width: 300}}>
                    <Select
                        displayEmpty
                        value={age}
                        onChange={handleChange}
                        inputProps={{'aria-label': 'Without label'}}
                        size='small'
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Placeholder</em>;
                            }
                        }}
                    >
                        <MenuItem disabled value="">
                            <em>Placeholder</em>
                        </MenuItem>
                        {/*{names.map((name) => (*/}
                        {/*    <MenuItem*/}
                        {/*        key={name}*/}
                        {/*        value={name}*/}
                        {/*        style={getStyles(name, personName, theme)}*/}
                        {/*    >*/}
                        {/*        {name}*/}
                        {/*    </MenuItem>*/}
                        {/*))}*/}
                    </Select>
                </FormControl>
                <Button variant="outlined">Add</Button>
            </Stack>
            <Stack>
                
            </Stack>
        </RootStyle>
    );
}



