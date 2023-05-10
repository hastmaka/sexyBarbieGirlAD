// material
import {FormControl, MenuItem, Select, Stack} from '@mui/material';
//
import EzColor from '../EzColor/EzColor';
import {useState} from "react";

export default function EzSelect({
    initialData, valueToIterate, value, setValue
}) {
    const [selectedValue, setSelectedValue] = useState(value);
    return (
        <FormControl fullWidth>
            {/*<InputLabel id='demo-simple-select-label'>Age</InputLabel>*/}
            <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={selectedValue}
                onChange={e => {
                    setSelectedValue(e.target.value)
                    setValue(e.target.value)
                }}
                label='Age'
            >
                {/*<CustomMenuItem initialData={initialData}/>*/}
                {initialData.map(item =>
                    <MenuItem value={item[valueToIterate]} key={item[valueToIterate]}>
                        <Stack direction='row' justifyContent='space-between' width='100%'>
                            <span>{item[valueToIterate]}</span>
                            {valueToIterate === 'color' && <EzColor color={item[valueToIterate]}/>}
                        </Stack>
                    </MenuItem>
                )}

            </Select>
        </FormControl>
    );
}
