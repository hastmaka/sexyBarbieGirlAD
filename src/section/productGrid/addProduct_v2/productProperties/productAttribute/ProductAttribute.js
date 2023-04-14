import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
// material
import {Divider, Stack, TextField, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
//
import EzText from "../../../../../components/ezComponents/EzText/EzText";
import EzSetOfIcons from "../../../../../components/ezComponents/EzSetOfIcons/EzSetOfIcons";
import EzMenu from "../../../../../components/ezComponents/EzMenu/EzMenu";
import ProductAttributeAddField from "./ProductAttributeAddField";
import {sortArray} from "../../../../../helper";

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
    const [openMenu, setOpenMenu] = useState(null);

    useEffect(_ => {
        if(data.description.length  > 0){
            setState(prev => {
                const existingDescriptions = new Set(data.description.map((item) => item.name));
                const newMenu = prev.descriptionMenu.filter((item) => !existingDescriptions.has(item.text));
                return {
                    ...prev,
                    descriptionMenu: [...newMenu]
                }
            })
        }
    }, [])

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
        tooltip: 'Add Description',
        badgeValue: false,
        visibleOnMobile: 1,
        icon: <AddBoxIcon sx={{fill: 'green'}}/>,
        ref: profileAnchorRef,
            functionality: {
                onClick: (e) => handleClick(e)
            }
        }, {
            id: 2,
            tooltip: 'Delete All',
            badgeValue: false,
            visibleOnMobile: 1,
            icon: <DeleteIcon
                sx={{fill: 'red'}}
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
            {state.description.length > 0 &&
                sortArray(state.description, 'id').map(item =>
                    <ProductAttributeAddField
                        key={item.id || item.name}
                        item={item}
                        onChange={onchange}
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
                            onchange({action: 'delete', item})
                        }}
                    />
                )
            }
        </RootStyle>
    );
}

ProductAttribute.prototype = {
    data: PropTypes.object,
    onChange: PropTypes.func.isRequired
}