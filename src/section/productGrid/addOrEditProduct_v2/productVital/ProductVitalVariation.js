// material
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
//
import AOEPChild_1 from "../localComponent/AOEPChild_1";
import AOEPHelp from "../localComponent/AOEPHelp";
import {ProductActiveHelpText} from "../AOEPTextHelpData";
import AOEPChild_2 from "../localComponent/AOEPChild_2";
import AOEPParent from "../localComponent/AOEPParent";

export default function ProductVitalVariation() {
    return (
        <AOEPParent>
            <AOEPChild_1>
                <AOEPHelp
                    text='* Variation'
                    helpText={ProductActiveHelpText}
                />
            </AOEPChild_1>
            <AOEPChild_2 direction='row' alignItems='center' gap='24px'>
                Does this product has Variation?
                <RadioGroup
                    sx={{flexDirection: 'row'}}
                    name='hasVariation'
                    defaultValue='yes'
                    // onChange={handleChange}
                >
                    <FormControlLabel value="yes" control={<Radio/>} label="Yes"/>
                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                </RadioGroup>
            </AOEPChild_2>
        </AOEPParent>
    );
}
