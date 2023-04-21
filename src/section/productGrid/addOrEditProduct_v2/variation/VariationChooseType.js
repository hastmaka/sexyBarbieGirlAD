// material
import {Checkbox, FormControlLabel, FormGroup, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import AOEPChild_1 from "../localComponent/AOEPChild_1";
import AOEPHelp from "../localComponent/AOEPHelp";
import {VariationTypeHelpText} from "../AOEPTextHelpData";
import AOEPChild_2 from "../localComponent/AOEPChild_2";
import AOEPParent from "../localComponent/AOEPParent";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function VariationChooseType({handleCheckbox}) {
    return (
        <AOEPParent>
            <AOEPChild_1>
                <AOEPHelp
                    text='Choose variation type'
                    helpText={VariationTypeHelpText}
                />
            </AOEPChild_1>
            <AOEPChild_2>
                <FormGroup sx={{flexDirection: 'row'}} gap='24px'>
                    <FormControlLabel control={<Checkbox onChange={_ => handleCheckbox('size')}/>} label="Size"/>
                    <FormControlLabel control={<Checkbox onChange={_ => handleCheckbox('color')}/>} label="Color"/>
                    <FormControlLabel control={<Checkbox disabled/>} label="Style Name"/>
                    <FormControlLabel control={<Checkbox disabled/>} label="Package Quantity"/>
                </FormGroup>
            </AOEPChild_2>
        </AOEPParent>
    );
}
