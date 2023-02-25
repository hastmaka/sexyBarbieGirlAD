import {Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack} from "@mui/material";
import {forwardRef, useMemo, useState} from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {NavLink} from "react-router-dom";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";

export const RootStyle = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '160px',
    minWidth: '160px',
    height: 'calc(100vh - 60px'
}));

const EzSideBar = ({data}) => {
    return (
        <RootStyle>
            <Stack sx={{marginBottom: '15px'}}>
                <nav aria-label="side-bar">
                    {data.map(item =>
                        <MenuItem key={item.id} item={item}/>
                    )}
                </nav>
            </Stack>
        </RootStyle>
    );
}

EzSideBar.propTypes = {
    data: PropTypes.array.isRequired
};

export default EzSideBar;

const hasChildren = (item) => {
    const {items: children} = item;

    if (children === undefined) {
        return false;
    } else if (children.constructor !== Array) {
        return false;
    } else if (children.length === 0) {
        return false;
    }
    return true;
}


const MenuItem = ({item}) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item}/>;
};


const SingleLevel = ({item}) => {
    const {icon, to, text} = item;
    const renderLink = useMemo(() =>
            forwardRef(function Link(itemProps, ref) {
                return <NavLink to={to} ref={ref} {...itemProps} role={undefined}/>;
            }),
        [to]
    );
    return (
        <ListItemButton component={renderLink}>
            <ListItemIcon sx={{minWidth: '30px'}}>{icon}</ListItemIcon>
            <ListItemText primary={text}/>
        </ListItemButton>
    );
};


const MultiLevel = ({item}) => {
    const {items: children} = item;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            <ListItem onClick={handleClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title}/>
                {open ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children.map((child, key) => (
                        <MenuItem key={key} item={child}/>
                    ))}
                </List>
            </Collapse>
        </>
    );
};
