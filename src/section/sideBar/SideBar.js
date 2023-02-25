// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import logo from '../../resources/logo_black.png';
import EzSideBar from "../../components/ezComponents/EzSideBar/EzSideBar";
import {item} from "./SideBarData";
import {NavLink} from "react-router-dom";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    height: '100vh'
}));

const LogoContainer = styled(Stack)(({theme}) => ({
    height: '48px',
    width: '140px',
}))
//----------------------------------------------------------------

export default function SideBar() {
    return (
        <RootStyle>
            <Stack sx={{height: '60px'}} justifyContent='center' alignItems='center'>
                <LogoContainer>
                    <img src={logo} alt='logo' style={{height: '100%', width: '100%'}}/>
                </LogoContainer>
            </Stack>
            <EzSideBar data={item}/>
        </RootStyle>
    );
}