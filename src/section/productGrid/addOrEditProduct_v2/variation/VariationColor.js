import PropTypes from "prop-types";
//
import AOEPChild_1 from "../localComponent/AOEPChild_1";
import AOEPHelp from "../localComponent/AOEPHelp";
import {VariationColorHelpText} from "../AOEPTextHelpData";
import AOEPChild_2 from "../localComponent/AOEPChild_2";
import EzAutocompleteMultiple from "../../../../components/ezComponents/EzAutocompleteMultiple/EzAutocompleteMultiple";
import {colorArray} from "../../../../helper/staticData/StaticData";
import AOEPParent from "../localComponent/AOEPParent";
import {productSliceActions} from "../../../../store/productSlice";

export default function VariationColor({tempProduct}) {
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
                    value={tempProduct.color}
                    setValue={option => {
                        window.dispatch(
                            productSliceActions.setTempProduct({
                                ...tempProduct,
                                color: option
                            })
                        )
                    }}
                    valueForIteration='color'
                />
            </AOEPChild_2>
        </AOEPParent>
    );
}

VariationColor.prototype = {
    tempProduct: PropTypes.object.isRequired
}