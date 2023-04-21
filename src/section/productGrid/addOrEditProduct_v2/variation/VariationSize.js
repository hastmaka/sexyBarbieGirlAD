// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import AOEPChild_1 from "../localComponent/AOEPChild_1";
import AOEPHelp from "../localComponent/AOEPHelp";
import {VariationSizeHelpText} from "../AOEPTextHelpData";
import AOEPChild_2 from "../localComponent/AOEPChild_2";
import EzAutocompleteMultiple from "../../../../components/ezComponents/EzAutocompleteMultiple/EzAutocompleteMultiple";
import {sizeArray} from "../../../../helper/staticData/StaticData";
import AOEPParent from "../localComponent/AOEPParent";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function VariationSize() {
    return (
        <AOEPParent>
            <AOEPChild_1>
                <AOEPHelp
                    text='Size'
                    helpText={VariationSizeHelpText}
                />
            </AOEPChild_1>
            <AOEPChild_2>
                <EzAutocompleteMultiple
                    initialData={sizeArray}
                    // freeSolo
                    label='Product Size'
                    // value={data.size}
                    // setValue={option => onChangeHandler(option, 'size')}
                    valueForIteration='size'
                />
            </AOEPChild_2>
        </AOEPParent>
    );
}
