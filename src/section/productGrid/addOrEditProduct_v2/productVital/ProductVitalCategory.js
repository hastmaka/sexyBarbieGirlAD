import {useSelector} from "react-redux";
//
import AOEPChild_1 from "../localComponent/AOEPChild_1";
import AOEPHelp from "../localComponent/AOEPHelp";
import {VariationCategoryHelpText} from "../AOEPTextHelpData";
import AOEPChild_2 from "../localComponent/AOEPChild_2";
import AOEPParent from "../localComponent/AOEPParent";
import EzAutocompleteMultiple from "../../../../components/ezComponents/EzAutocompleteMultiple/EzAutocompleteMultiple";
import {productSliceActions} from "../../../../store/productSlice";

export default function ProductVitalCategory({tempProduct}) {
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
                    value={tempProduct.category}
                    setValue={option => {
                        window.dispatch(
                            productSliceActions.setTempProduct({
                                ...tempProduct,
                                category: option.map(item => item.toLowerCase())
                            })
                        )
                    }}
                />
            </AOEPChild_2>
        </AOEPParent>
    );
}
