import PropTypes from "prop-types";
//
import AOEPChild_1 from "../localComponent/AOEPChild_1";
import AOEPHelp from "../localComponent/AOEPHelp";
import {VariationSizeHelpText} from "../AOEPTextHelpData";
import AOEPChild_2 from "../localComponent/AOEPChild_2";
import EzAutocompleteMultiple from "../../../../components/ezComponents/EzAutocompleteMultiple/EzAutocompleteMultiple";
import {sizeArray} from "../../../../helper/staticData/StaticData";
import AOEPParent from "../localComponent/AOEPParent";
import {productSliceActions} from "../../../../store/productSlice";
import {sortArray} from "../../../../helper";

export default function VariationSize({tempProduct}) {
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
                    value={tempProduct.size}
                    setValue={option => {
                        window.dispatch(
                            productSliceActions.setTempProduct({
                                ...tempProduct,
                                size: sortArray(option, 'bust')
                            })
                        )
                    }}
                    valueForIteration='size'
                />
            </AOEPChild_2>
        </AOEPParent>
    );
}

VariationSize.prototype = {
    tempProduct: PropTypes.object.isRequired
}