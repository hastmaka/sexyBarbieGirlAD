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
import {productSliceActions} from "../../../../store/productSlice";
import {checkProductNameApi} from "../../../../helper/firebase/FirestoreApi";
import {useCallback, useLayoutEffect, useMemo, useState} from "react";
import {capitalizeFirstLetter} from "../../../../helper";

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
export default function ProductVitalProductName({formRef, tempProduct, tempProductState}) {
    const [value, setValue] = useState(tempProduct.name);

    useLayoutEffect(() => {
        setValue(tempProduct.name)
    }, [tempProduct.name])

    const handleChange = (e) => {
        setValue(e.target.value);
        if(e.target.value !== tempProduct.name) {
            debouncedDispatch({
                ...tempProduct,
                name: capitalizeFirstLetter(e.target.value)
            });
        }
    };

    const handleCheckProductName = async (value) => {
        //check first if the product name was already check in the db
        if(!tempProductState.checkProductName.check) {
            const name = new FormData(formRef.current).get(value);
            const capName = name.slice(0, 1).toUpperCase() + name.slice(1)
            //check if name already existed on db
            if (!capName) {
                return window.displayNotification({
                    type: 'warning',
                    content: `Name can't be empty`
                })
            }
            const res = await checkProductNameApi(capName);
            window.dispatch(
                productSliceActions.updateTempProductState({
                    ...tempProductState,
                    checkProductName: {
                        check: !tempProductState.checkProductName.check,
                        isOnDb: !res,
                        value: capName
                    }
                })
            )
        } else {
            window.displayNotification({
                type: 'success',
                content: 'The product name was already verified'
            })
        }
    }

    const handleTempProductNameChange = useCallback(() => {
        //make function don't trigger first time open the component
        if(!tempProductState.productNameModified) return
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

    const debouncedDispatch = useMemo(
        () =>
            debounce((newTempProduct) => {
                window.dispatch(productSliceActions.setTempProduct(newTempProduct));
                window.dispatch(
                    productSliceActions.updateTempProductState({
                    ...tempProductState,
                    productNameModified: true
                }));
            }, 200),
        []
    );

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
                    value={value}
                    size='small'
                    label="Name"
                    name='name'
                    required
                    onChange={handleChange}
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