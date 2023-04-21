// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import AOEPChild_1 from "../localComponent/AOEPChild_1";
import AOEPHelp from "../localComponent/AOEPHelp";
import {VariationCategoryHelpText} from "../AOEPTextHelpData";
import AOEPChild_2 from "../localComponent/AOEPChild_2";
import AOEPParent from "../localComponent/AOEPParent";
import EzAutocompleteMultiple from "../../../../components/ezComponents/EzAutocompleteMultiple/EzAutocompleteMultiple";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function ProductVitalCategory({data}) {
    return (
        <AOEPParent>
            <AOEPChild_1>
                <AOEPHelp
                    text='* Category'
                    helpText={VariationCategoryHelpText}
                />
            </AOEPChild_1>
            <AOEPChild_2>
                <EzAutocompleteMultiple
                    freeSolo
                    label='Product Category *'
                    value={data.category}
                    // setValue={option => onChangeHandler(option, 'category')}
                />
            </AOEPChild_2>
        </AOEPParent>
    );
}
