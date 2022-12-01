// material
import {Checkbox, FormControlLabel, FormGroup, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../../../components/ezComponents/EzText/EzText";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
}));

const CustomCheckbox = styled(Checkbox)(({theme}) => ({
    '& .MuiSvgIcon-root': { fontSize: 28 }
}))

//----------------------------------------------------------------

export default function CheckboxGroup() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
        <RootStyle>
            <EzText text='Sizes'/>
            <FormGroup row>
                <FormControlLabel control={<CustomCheckbox name='xs' {...label}/>} label="XS" />
                <FormControlLabel control={<CustomCheckbox name='s' {...label}/>} label="S" />
                <FormControlLabel control={<CustomCheckbox name='m' {...label}/>} label="M" />
                <FormControlLabel control={<CustomCheckbox name='l' {...label}/>} label="L" />
                <FormControlLabel control={<CustomCheckbox name='xl' {...label}/>} label="XL" />
            </FormGroup>
        </RootStyle>
    );
}
