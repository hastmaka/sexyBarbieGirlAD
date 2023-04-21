// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import AOEPChild_1 from "../localComponent/AOEPChild_1";
import AOEPHelp from "../localComponent/AOEPHelp";
import {VariationColorHelpText} from "../AOEPTextHelpData";
import AOEPChild_2 from "../localComponent/AOEPChild_2";
import EzAutocompleteMultiple from "../../../../components/ezComponents/EzAutocompleteMultiple/EzAutocompleteMultiple";
import {colorArray} from "../../../../helper/staticData/StaticData";
import AOEPParent from "../localComponent/AOEPParent";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function VariationColor() {
    return (
        <AOEPParent>
            <AOEPChild_1>
                <AOEPHelp
                    text='Color'
                    helpText={VariationColorHelpText}
                />
            </AOEPChild_1>
            <AOEPChild_2>
                <EzAutocompleteMultiple
                    initialData={colorArray}
                    freeSolo
                    label='Product Color'
                    value={[]}
                    // setValue={option => onChangeHandler(option, 'color')}
                    valueForIteration='color'
                />
            </AOEPChild_2>
        </AOEPParent>
    );
}
