// material
import {TextField} from "@mui/material";
//
import AOEPChild_1 from "../localComponent/AOEPChild_1";
import AOEPHelp from "../localComponent/AOEPHelp";
import {VariationBrandNameHelpText} from "../AOEPTextHelpData";
import AOEPChild_2 from "../localComponent/AOEPChild_2";
import AOEPParent from "../localComponent/AOEPParent";
import PropTypes from "prop-types";

export default function ProductVitalBrandName({data}) {
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
                    defaultValue={data.name}
                    size='small'
                    label="brand"
                    name='brand'
                    required
                />
            </AOEPChild_2>
        </AOEPParent>
    );
}

ProductVitalBrandName.prototype = {
    data: PropTypes.object.isRequired
}