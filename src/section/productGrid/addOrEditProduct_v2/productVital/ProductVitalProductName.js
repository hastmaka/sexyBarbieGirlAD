// material
import {debounce, InputAdornment, Stack, TextField, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import AOEPChild_1 from "../localComponent/AOEPChild_1";
import AOEPHelp from "../localComponent/AOEPHelp";
import {ProductNameHelpText} from "../AOEPTextHelpData";
import AOEPChild_2 from "../localComponent/AOEPChild_2";
import EzHelpText from "../../../../components/ezComponents/EzHelpText/EzHelpText";
import AOEPParent from "../localComponent/AOEPParent";
import PropTypes from "prop-types";
import {productSliceActions} from "../../../../store/productSlice";
import {useSelector} from "react-redux";
import {checkProductNameApi} from "../../../../helper/firebase/FirestoreApi";
import {useCallback, useLayoutEffect} from "react";

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

export default function ProductVitalProductName({formRef}) {
    const {tempProduct, tempProductState} = useSelector(slice => slice.product);
    // const [checkProductName] = useCheckProductName(tempProduct);

    const handleCheckProductName = async (value) => {
        const name = new FormData(formRef.current).get(value)
        //check if name already existed on db
        if(!name) {
            return window.displayNotification({
                type: 'warning',
                content: `Name can't be empty`
            })
        }
        const res = await checkProductNameApi(name);
        window.dispatch(
            productSliceActions.updateTempProductState({
                ...tempProductState,
                checkProductName: {
                    check: !tempProductState.checkProductName.check,
                    isOnDb: !res,
                    value: name
                }
            })
        )
    }

    const handleTempProductNameChange = useCallback(() => {
        if (!tempProduct.name?.trim()) {
            window.dispatch(
                productSliceActions.updateTempProductState({
                    ...tempProductState,
                    checkProductName: {
                        check: false,
                        isOnDb: null,
                        value: '',
                    },
                })
            );
        } else if (tempProductState.checkProductName.value !== tempProduct.name) {
            if(tempProductState.checkProductName.value !== '') {
                window.dispatch(
                    productSliceActions.updateTempProductState({
                        ...tempProductState,
                        checkProductName: {
                            check: false,
                            isOnDb: null,
                            value: '',
                        },
                    })
                );
            }
        }
    }, [tempProductState.checkProductName.value, tempProduct.name]);

    useLayoutEffect(() => {
        handleTempProductNameChange();
    }, [handleTempProductNameChange]);

    const debouncedDispatch = debounce((newTempProduct) => {
        window.dispatch(productSliceActions.setTempProduct(newTempProduct));
    }, 400);

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
                    error={tempProductState.checkProductName.isOnDb && tempProduct.name !== ''}
                    defaultValue={tempProduct.name}
                    size='small'
                    label="name"
                    name='name'
                    required
                    onChange={e => {
                        debouncedDispatch({
                            ...tempProduct,
                            name: e.target.value
                        });
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Tooltip title="Check product name first" arrow>
                                    <Check onClick={_ => handleCheckProductName('name')}>Check</Check>
                                </Tooltip>
                            </InputAdornment>
                        )
                    }}
                />
                {tempProductState.checkProductName.isOnDb !== null && tempProduct.name !== '' &&
                    <EzHelpText
                        alignment='center'
                        text={tempProductState.checkProductName.isOnDb ? 'This name already exist' : 'Ok'}
                        sx={{color: tempProductState.checkProductName.isOnDb ? 'red' : 'green'}}
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