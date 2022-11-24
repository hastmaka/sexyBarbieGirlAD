/** material **/
import Menu from "@mui/material/Menu";
import {ListItemIcon, MenuItem} from "@mui/material";

//---------------------------------------------------------------------

const EzMenu = ({data, ...others}) => {
    // debugger
    return (
        <Menu
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgColor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            {...others}
        >
            {data?.length && data.map(item =>
                <MenuItems
                    key={item.id}
                    item={item}
                />
            )}
        </Menu>
    );
}

export default EzMenu;

let hoverColor = '#e1e1e1';

const MenuItems = ({item}) => {
    const {icon, text, listItemIcon, functionality} = item;

    const ItemsToRender = () => {
        if(listItemIcon) {
            return (
                <MenuItem {...functionality} sx={{'&:hover': {backgroundColor: hoverColor}}}>
                    <ListItemIcon>
                        {icon}{text}
                    </ListItemIcon>
                </MenuItem>
            )
        } else if (text === 'divider') {
            return icon
        } else if (!icon) {
            return (
                <MenuItem {...functionality} sx={{'&:hover': {backgroundColor: hoverColor}}}>
                    {text}
                </MenuItem>)
        } else {
            return (
                <MenuItem {...functionality} sx={{'&:hover': {backgroundColor: hoverColor}}}>
                    {icon}{text}
                </MenuItem>
            )
        }
    }
    return (
        <ItemsToRender/>
    );
}