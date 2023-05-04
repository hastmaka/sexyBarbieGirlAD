// material
import {MenuItem, Select} from "@mui/material";
//
import AOEPChild_1 from "../localComponent/AOEPChild_1";
import AOEPHelp from "../localComponent/AOEPHelp";
import {ProductActiveHelpText} from "../AOEPTextHelpData";
import AOEPChild_2 from "../localComponent/AOEPChild_2";
import AOEPParent from "../localComponent/AOEPParent";
import {productSliceActions} from "../../../../store/productSlice";

//----------------------------------------------------------------

export default function ProductVitalActive({tempProduct}) {

    const handleChange = (e) => {
        window.dispatch(productSliceActions.setTempProduct({
            ...tempProduct,
            ['active']: e.target.value === 'true'
        }))
    }

    return (
        <AOEPParent>
            <AOEPChild_1>
                <AOEPHelp
                    text='* Product Active'
                    helpText={ProductActiveHelpText}
                />
            </AOEPChild_1>
            <AOEPChild_2>
                <Select
                    variant="standard"
                    name='active'
                    defaultValue='true'
                    sx={{width: '100px'}}
                    onChange={handleChange}
                >
                    <MenuItem value='true'>True</MenuItem>
                    <MenuItem value='false'>False</MenuItem>
                </Select>
            </AOEPChild_2>
        </AOEPParent>
    );
}
