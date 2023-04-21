// material
import {InputAdornment, Stack, TextField, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import AOEPChild_1 from "../localComponent/AOEPChild_1";
import AOEPHelp from "../localComponent/AOEPHelp";
import {ProductNameHelpText} from "../AOEPTextHelpData";
import AOEPChild_2 from "../localComponent/AOEPChild_2";
import EzHelpText from "../../../../components/ezComponents/EzHelpText/EzHelpText";
import AOEPParent from "../localComponent/AOEPParent";
import PropTypes from "prop-types";

//----------------------------------------------------------------

const Check = styled(Stack)(({theme}) => ({
    cursor: 'pointer',
    color: '#ffffff',
    backgroundColor: '#50bd89',
    padding: '2px 5px',
    borderRadius: '6px',
    border: `1px solid ${'#ffffff'}`,
    transition: 'all 300ms',
    '&:hover': {
        border: `1px solid ${'#50bd89'}`,
    }
}));

//----------------------------------------------------------------

export default function ProductVitalProductName({checkProductName, handleCheckProductName, data}) {
    return (
        <AOEPParent>
            <AOEPChild_1>
                <AOEPHelp
                    text='* Product Name'
                    helpText={ProductNameHelpText}
                />
            </AOEPChild_1>
            <AOEPChild_2>
                <TextField
                    error={checkProductName.isOnDb && data.name !== ''}
                    defaultValue={data.name}
                    size='small'
                    label="name"
                    name='name'
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Tooltip title="Check product name first" arrow>
                                    <Check onClick={_ => handleCheckProductName(data.name)}>Check</Check>
                                </Tooltip>
                            </InputAdornment>
                        )
                    }}
                />
                {checkProductName.isOnDb !== null && data.name !== '' &&
                    <EzHelpText
                        alignment='center'
                        text={checkProductName.isOnDb ? 'This name already exist' : 'Ok'}
                        sx={{color: checkProductName.isOnDb ? 'red' : 'green'}}
                        top={2}
                    />
                }
            </AOEPChild_2>
        </AOEPParent>
    );
}

ProductVitalProductName.prototype = {
    checkProductName: PropTypes.object.isRequired,
    handleCheckProductName: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}