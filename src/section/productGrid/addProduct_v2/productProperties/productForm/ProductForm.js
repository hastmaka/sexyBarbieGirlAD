// material
import {
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Tooltip
} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import EzText from "../../../../../components/ezComponents/EzText/EzText";
import EzHelpText from "../../../../../components/ezComponents/EzHelpText/EzHelpText";
import EzAutocompleteMultiple
    from "../../../../../components/ezComponents/EzAutocompleteMultiple/EzAutocompleteMultiple";
import {colorArray, sizeArray} from "../../../../../helper/staticData/StaticData";
import {checkProductNameApi} from "../../../../../helper/firebase/FirestoreApi";
import PropTypes from "prop-types";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flex: 1,
    gap: '10px'
}));

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
}))

//----------------------------------------------------------------

export default function ProductForm({data, checkProductName, onChangeHandler, setCheckProductName}) {
    const handleCheckProductName = (name) => {
        //check if name already existed on db
        checkProductNameApi(name).then(res => {
            setCheckProductName(prev => {
                return {
                    ...prev,
                    check: !prev.check,
                    isOnDb: !res,
                    value: name
                }
            })
        })
    }
    return (
        <RootStyle>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <EzText text='Product Active'/>
                <Select
                    variant="standard"
                    name='active'
                    defaultValue={data.active}
                    sx={{width: '100px'}}
                >
                    <MenuItem value='true'>True</MenuItem>
                    <MenuItem value='false'>False</MenuItem>
                </Select>
            </Stack>

            <FormControl variant="outlined" size='small'>
                <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                <OutlinedInput
                    error={checkProductName.isOnDb && data.name !== ''}
                    value={data.name}
                    id="name"
                    label="name"
                    name='name'
                    onChange={e => onChangeHandler(e.target.value, 'name')}
                    required
                    endAdornment={
                        <InputAdornment position="end">
                            {data.name !== '' &&
                                <Tooltip title="Check product name first">
                                    <Check onClick={_ => handleCheckProductName(data.name)}>Check</Check>
                                </Tooltip>
                            }
                        </InputAdornment>
                    }
                />
                {checkProductName.isOnDb !== null && data.name !== '' &&
                    <EzHelpText
                        alignment='center'
                        text={checkProductName.isOnDb ? 'This name already exist' : 'Ok'}
                        sx={{color: checkProductName.isOnDb ? 'red' : 'green'}}
                        top={2}
                    />
                }
            </FormControl>

            <TextField
                name='price'
                label='Price'
                size='small'
                value={data.price}
                onChange={(event) => onChangeHandler(event, 'price')}
            />

            <EzAutocompleteMultiple
                freeSolo
                label='Product Category'
                value={data.category}
                setValue={option => onChangeHandler(option, 'category')}
            />


            <EzAutocompleteMultiple
                initialData={colorArray}
                freeSolo
                label='Product Color'
                value={data.color}
                setValue={option => onChangeHandler(option, 'color')}
                valueForIteration='color'
            />

            <EzAutocompleteMultiple
                initialData={sizeArray}
                // freeSolo
                label='Product Size'
                value={data.size}
                setValue={option => onChangeHandler(option, 'size')}
                valueForIteration='size'
            />
        </RootStyle>
    );
}

ProductForm.prototype = {
    data: PropTypes.object.isRequired,
    checkProduct: PropTypes.object.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    setCheckProduct: PropTypes.func.isRequired
};