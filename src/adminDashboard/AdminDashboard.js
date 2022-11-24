// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
//
import {useNavigate} from "react-router-dom";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row'
}));

const LogoContainer = styled(Stack)(({theme}) => ({
    width: '30px',
    height: '30px',
    marginTop: '5px',
    '& > img': {
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        filter: 'brightness(0.5) invert(50%)',
        transition: 'all 200ms',
        '&:hover': {
            transform: 'scale(1.02)',
            filter: 'brightness(0) invert(1)',
        }
    }
}))

//----------------------------------------------------------------

const SIDEBARICONS = [{
    id: 1,
    tooltip: 'Home',
    toolTipPosition: 'right',
    badgeValue: false,
    icon: <HomeIcon/>,
    navigateTo: '/admin-dashboard'
}]

export default function AdminDashboard() {
    return (
        <RootStyle>
            admin
        </RootStyle>
    );
}
