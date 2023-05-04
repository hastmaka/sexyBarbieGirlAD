import {useSelector} from "react-redux";
// material
import AOEPChild_1 from "../localComponent/AOEPChild_1";
import AOEPHelp from "../localComponent/AOEPHelp";
import {VariationTagsHelpText} from "../AOEPTextHelpData";
import AOEPChild_2 from "../localComponent/AOEPChild_2";
import AOEPParent from "../localComponent/AOEPParent";
import EzAutocompleteMultiple from "../../../../components/ezComponents/EzAutocompleteMultiple/EzAutocompleteMultiple";
import {productSliceActions} from "../../../../store/productSlice";

export default function ProductVitalTags({tempProduct}) {
    return (
        <AOEPParent>
            <AOEPChild_1>
                <AOEPHelp
                    text='* Tags'
                    helpText={VariationTagsHelpText}
                />
            </AOEPChild_1>
            <AOEPChild_2>
                <EzAutocompleteMultiple
                    freeSolo
                    label='Product Tags *'
                    value={tempProduct.tags}
                    setValue={option => {
                        window.dispatch(
                            productSliceActions.setTempProduct({
                                ...tempProduct,
                                tags: option.map(item => item.toLowerCase())
                            })
                        )
                    }}
                />
            </AOEPChild_2>
        </AOEPParent>
    );
}
