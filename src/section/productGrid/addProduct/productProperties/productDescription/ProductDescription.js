import {useRef, useState} from "react";
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
import ProductDescriptionAddField from "./ProductDescriptionAddField";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flex: 1
}));

const RightContainer = styled(Stack)(({theme}) => ({
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
}));

//----------------------------------------------------------------

export default function ProductDescription({onchange}) {
    const [description, setDescription] = useState([]);
    const [descriptionMenu, setDescriptionMenu] = useState([
        {
            id: 1,
            text: 'Style',
            functionality: {
                onClick: () => handleFunctionality(descriptionMenu[0])
            }
        }, {
            id: 2,
            text: 'Details',
            functionality: {
                onClick: () => handleFunctionality(descriptionMenu[1])
            }
        }, {
            id: 3,
            text: 'Pattern Type',
            functionality: {
                onClick: () => handleFunctionality(descriptionMenu[2])
            }
        }, {
            id: 4,
            text: 'Bottom Type',
            functionality: {
                onClick: () => handleFunctionality(descriptionMenu[3])
            }
        }, {
            id: 5,
            text: 'Bra Type',
            functionality: {
                onClick: () => handleFunctionality(descriptionMenu[4])
            }
        }, {
            id: 6,
            text: 'Neckline',
            functionality: {
                onClick: () => handleFunctionality(descriptionMenu[5])
            }
        }, {
            id: 7,
            text: 'Care Instructions',
            functionality: {
                onClick: () => handleFunctionality(descriptionMenu[6])
            }
        }, {
            id: 8,
            text: 'Material',
            functionality: {
                onClick: () => handleFunctionality(descriptionMenu[7])
            }
        }, {
            id: 9,
            text: 'Composition',
            functionality: {
                onClick: () => handleFunctionality(descriptionMenu[8])
            }
        }, {
            id: 10,
            icon: <Divider/>,
            text: 'divider',
            listItemIcon: false
        }, {
            id: 11,
            text: 'Custom',
            functionality: {
                onClick: () => handleFunctionality(descriptionMenu[10])
            }
        }]);
    //safe copy to restore manu later
    const [descriptionMenuCopy, setDescriptionMenuCopy] = useState([]);
    const profileAnchorRef = useRef(null);
    const [openMenu, setOpenMenu] = useState(null);
    const handleClick = (e) => setOpenMenu(e.currentTarget);
    const handleClose = () => {setOpenMenu(null)};

    const handleFunctionality = (item) => {
        //in case of custom description implementation
        if(item.text === 'Custom') {
            return
        }
        const desExisted = description.findIndex(i => i.name === item.text);
        if(desExisted === -1) {
            setDescription(prev => [...prev, item])
            setDescriptionMenuCopy(descriptionMenu)
            setDescriptionMenu(prev => prev.filter(i => i.text !== item.text))
        }
    }

    const RIGHTCONTAINERITEMS = [{
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
            onClick: (e) => {
                setDescriptionMenu(descriptionMenuCopy)
                setDescription([])
                onchange({action: 'delete-all'})
            }
        }
    }]
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
                data={descriptionMenu.sort((x, y) => {return (x.id - y.id) * 2 - 1})}
            />
            {description.length > 0 &&
                description.map(item =>
                    <ProductDescriptionAddField
                        key={item.id}
                        item={item}
                        onChange={onchange}
                        onDelete={_ => {
                            setDescription(prev => prev.filter(i => i.text !== item.text))
                            setDescriptionMenu(prev => [...prev, item])
                            onchange({action: 'delete', item})
                        }}
                    />
                )
            }
        </RootStyle>
    );
}

ProductDescription.prototype = {
    onChange: PropTypes.func.isRequired
}