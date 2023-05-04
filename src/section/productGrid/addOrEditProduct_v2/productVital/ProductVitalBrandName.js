// material
import {debounce, TextField} from "@mui/material";
//
import AOEPChild_1 from "../localComponent/AOEPChild_1";
import AOEPHelp from "../localComponent/AOEPHelp";
import {VariationBrandNameHelpText} from "../AOEPTextHelpData";
import AOEPChild_2 from "../localComponent/AOEPChild_2";
import AOEPParent from "../localComponent/AOEPParent";
import PropTypes from "prop-types";
import {productSliceActions} from "../../../../store/productSlice";

export default function ProductVitalBrandName({tempProduct}) {

    const debouncedDispatch = debounce((newTempProduct) => {
        window.dispatch(productSliceActions.setTempProduct(newTempProduct));
    }, 400);

    return (
        <AOEPParent>
            <AOEPChild_1>
                <AOEPHelp
                    text='* Brand Name'
                    helpText={VariationBrandNameHelpText}
                />
            </AOEPChild_1>
            <AOEPChild_2>
                <TextField
                    defaultValue={tempProduct.brandName}
                    size='small'
                    label="Brand"
                    name='brand'
                    required
                    onChange={e => {
                        debouncedDispatch({
                            ...tempProduct,
                            brandName: e.target.value
                        });
                    }}
                />
            </AOEPChild_2>
        </AOEPParent>
    );
}

ProductVitalBrandName.prototype = {
    data: PropTypes.object.isRequired
}