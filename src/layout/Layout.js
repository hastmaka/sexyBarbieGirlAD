// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {Outlet} from "react-router-dom";
import SideBar from "../section/sideBar/SideBar";
import ToolBar from "../section/toolBar/ToolBar";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'row'
}));

const ViewContainer = styled(Stack)(({theme}) => ({
    width: '100%',
    backgroundColor: theme.palette.ecommerce.bg_parent,
}));

const ViewContainerFix = styled(Stack)(({theme}) => ({
    alignItems: 'center',
}));

const OutletContainer = styled(Stack)(({theme}) => ({
    backgroundColor: theme.palette.ecommerce.bg_parent,
    flexGrow: 1,
    padding: '10px',
    maxWidth: '1920px',
    width: '100%'
}));

//----------------------------------------------------------------

export default function Layout() {
    return (
        <RootStyle>
            <SideBar/>
            <ViewContainer>
                <ToolBar/>
                <ViewContainerFix>
                    <OutletContainer>
                        <Outlet/>
                    </OutletContainer>
                </ViewContainerFix>
            </ViewContainer>
        </RootStyle>
    );
}