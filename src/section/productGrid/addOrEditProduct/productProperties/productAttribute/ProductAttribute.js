import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
// material
import {Box, Button, Divider, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
//
import EzText from "../../../../../components/ezComponents/EzText/EzText";
import EzSetOfIcons from "../../../../../components/ezComponents/EzSetOfIcons/EzSetOfIcons";
import EzMenu from "../../../../../components/ezComponents/EzMenu/EzMenu";
import ProductAttributeAddField from "./ProductAttributeAddField";
import {areArrayOfObjectsEqual, sortArray} from "../../../../../helper";
import {productSliceActions} from "../../../../../store/productSlice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flex: 1
}));

const RightContainer = styled(Stack)(({theme}) => ({
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
}));

//---------------------------------------------------------------------------------------
export default function ProductAttribute({data, onchange}) {
    const [state, setState] = useState({
        //to render TextField
        description: data.description,
        //to render Menu
        descriptionMenu: [
            {
                id: 1,
                text: 'Style',
                functionality: {
                    onClick: () => handleFunctionality(state.descriptionMenu[0])
                }
            }, {
                id: 2,
                text: 'Details',
                functionality: {
                    onClick: () => handleFunctionality(state.descriptionMenu[1])
                }
            }, {
                id: 3,
                text: 'Pattern Type',
                functionality: {
                    onClick: () => handleFunctionality(state.descriptionMenu[2])
                }
            }, {
                id: 4,
                text: 'Bottom Type',
                functionality: {
                    onClick: () => handleFunctionality(state.descriptionMenu[3])
                }
            }, {
                id: 5,
                text: 'Bra Type',
                functionality: {
                    onClick: () => handleFunctionality(state.descriptionMenu[4])
                }
            }, {
                id: 6,
                text: 'Neckline',
                functionality: {
                    onClick: () => handleFunctionality(state.descriptionMenu[5])
                }
            }, {
                id: 7,
                text: 'Care Instructions',
                functionality: {
                    onClick: () => handleFunctionality(state.descriptionMenu[6])
                }
            }, {
                id: 8,
                text: 'Material',
                functionality: {
                    onClick: () => handleFunctionality(state.descriptionMenu[7])
                }
            }, {
                id: 9,
                text: 'Composition',
                functionality: {
                    onClick: () => handleFunctionality(state.descriptionMenu[8])
                }
            }
        ],
        descriptionExtraMenu: [
            {
                id: 10,
                icon: <Divider/>,
                text: 'divider',
                listItemIcon: false
            }, {
                id: 11,
                text: 'Custom',
                functionality: {
                    onClick: () => handleFunctionality(state.descriptionExtraMenu[1])
                }
            }, {
                id: 12,
                text: 'Add all',
                functionality: {
                    onClick: () => handleFunctionality('addAll')
                }
            }
        ]
    });
    //safe copy to restore manu later
    const [menuCopy, _] = useState({
        descriptionMenuCopy: [...state.descriptionMenu],
        descriptionExtraMenuCopy: [...state.descriptionExtraMenu]
    })
    const profileAnchorRef = useRef(null);
    const formRef = useRef(null);
    const [openMenu, setOpenMenu] = useState(null);

    useEffect(_ => {
        if(data.description.length  > 0){
            setState(prev => {
                const existingDescriptions = new Set(data.description.map((item) => item.name));
                const newMenu = prev.descriptionMenu.filter((item) => !existingDescriptions.has(item.text));
                return {
                    ...prev,
                    description: data.description,
                    descriptionMenu: [...newMenu]
                }
            })
        }
    }, [data.description])

    const handleClick = (e) => setOpenMenu(e.currentTarget);
    const handleClose = () => {setOpenMenu(null)};

    const handleFunctionality = (item) => {
        //in case of custom description implementation
        if(item.text === 'Custom') {
            return
        }
        if(item === 'addAll') {
            return setState(prev => {
                return {
                    ...prev,
                    description: [...prev.description, ...prev.descriptionMenu],
                    descriptionMenu: [],
                    descriptionExtraMenu: [...prev.descriptionExtraMenu.filter(i => i.text === 'Custom')]
                }
            })
        }
        // debugger
        const desExisted = state.description.findIndex(i => i.name === item.text);
        if(desExisted === -1) {
            setState(prev => {
                return {
                    ...prev,
                    description: [...prev.description, item],
                    descriptionMenu: prev.descriptionMenu.filter(i => i.text !== item.text),
                    descriptionExtraMenu: prev.descriptionMenu.length === 1 ?
                        [...prev.descriptionExtraMenu.filter(i => i.text === 'Custom')] :
                        [...prev.descriptionExtraMenu]
                }
            })
        }
    }

    const RIGHTCONTAINERITEMS = [
        {
            id: 1,
            tooltip: 'Save Description',
            badgeValue: false,
            visibleOnMobile: 1,
            icon: <SaveIcon sx={{fill: '#457b9d'}}/>,
            functionality: {
                onClick: _ => {
                    let formData  = new FormData(formRef.current),
                        {description, ...rest} = data,
                        tempDescription = [...description],
                        formDataToCompare = [];
                    if(!description.length) {
                        return window.displayNotification({
                            type: 'warning',
                            content: `No description to save`
                        })
                    } else {
                        //check for empty values
                        for (const value of formData.values()) {
                            if(value === '') {
                                return window.displayNotification({
                                    type: 'error',
                                    content: `Product Description has empty values`
                                })
                            }
                        }
                        //check if data haven't been changed
                        for (const [key, value] of formData.entries()) {
                            formDataToCompare.push({name: key, value: value})
                        }
                        if(areArrayOfObjectsEqual(tempDescription, formDataToCompare)) {
                            return window.displayNotification({
                                type: 'warning',
                                content: `No description has been modified`
                            })
                        }
                        //if the key exist modify it, otherwise create it
                        for (const [key, value] of formData.entries()) {
                            let indexToUpdate = description.findIndex(item => item.name === key);
                            if(indexToUpdate !== -1) {
                                tempDescription[indexToUpdate] = {
                                    name: key,
                                    value: value
                                }
                                window.displayNotification({
                                    type: 'success',
                                    content: `Descriptions modified successfully`
                                })
                            } else {
                                tempDescription.push({name: key, value: value})
                                window.displayNotification({
                                    type: 'success',
                                    content: `New description ${key} was added`
                                })
                            }
                        }
                    }

                    //update data in the store
                    window.dispatch(productSliceActions.setProductInEditMode({description: tempDescription, ...rest}))
                }
            }
        },
        {
        id: 2,
        tooltip: 'Add Description',
        badgeValue: false,
        visibleOnMobile: 1,
        icon: <AddBoxIcon sx={{fill: '#2a9d8f'}}/>,
        ref: profileAnchorRef,
            functionality: {
                onClick: (e) => handleClick(e)
            }
        }, {
            id: 3,
            tooltip: 'Delete All',
            badgeValue: false,
            visibleOnMobile: 1,
            icon: <DeleteIcon
                sx={{fill: '#e63946'}}
            />,
            functionality: {
                onClick: _ => {
                    setState(prev => {
                        return {
                            ...prev,
                            description: [],
                            descriptionMenu: [...menuCopy.descriptionMenuCopy],
                            descriptionExtraMenu: [...menuCopy.descriptionExtraMenuCopy]
                        }
                    })
                    onchange({action: 'delete-all'})
                }
            }
        }
    ]

    return (
        <RootStyle>
            <RightContainer>
                <EzText text='Product Description'/>
                <div>
                    {RIGHTCONTAINERITEMS.map(item =>
                        <EzSetOfIcons
                            key={item.id}
                            tooltip={item.tooltip}
                            badgeValue={item.badgeValue}
                            icon={item.icon}
                            navigateTo={item.navigateTo}
                            functionality={item.functionality}
                            refComponent={item.ref}
                            visibleOnMobile={item.visibleOnMobile}
                        />
                    )}
                </div>
            </RightContainer>
            <EzMenu
                open={Boolean(openMenu)}
                anchorEl={openMenu}
                onClose={handleClose}
                onClick={handleClose}
                data={sortArray([...state.descriptionMenu, ...state.descriptionExtraMenu], 'id')}
            />
            <Box component='form' ref={formRef}>
                {state.description.length > 0 &&
                    sortArray(state.description, 'id').map(item =>
                        <ProductAttributeAddField
                            key={item.id || item.name}
                            item={item}
                            onDelete={_ => {
                                setState(prev => {
                                    let validItem = !item.id ?
                                        menuCopy.descriptionMenuCopy.filter(i => i.text === item.name)[0] :
                                        item
                                    return {
                                        ...prev,
                                        description: prev.description.filter(i =>
                                            //check if the item comes from state or from data.description
                                            !item.id ? i.name !== item.name : i.text !== item.text
                                        ),
                                        //add the item to the menu again
                                        descriptionMenu: [...prev.descriptionMenu, validItem],
                                        //restore descriptionMenuExtra conditionally
                                        descriptionExtraMenu: !prev.descriptionMenu.length ?
                                            [...menuCopy.descriptionExtraMenuCopy] :
                                            [...prev.descriptionExtraMenu]
                                    }
                                })
                                //send the item to update the product variable
                                // onchange({action: 'delete', item})
                                let {description, ...rest} = data,
                                    tempDescription = [...description];
                                // debugger
                                window.dispatch(productSliceActions.setProductInEditMode({
                                    description: tempDescription.length === 1 ? [] : tempDescription.filter(i => i.name !== item.name),
                                    ...rest
                                }))
                            }}
                        />
                    )
                }
            </Box>
        </RootStyle>
    );
}

ProductAttribute.prototype = {
    data: PropTypes.object,
    onChange: PropTypes.func.isRequired
}