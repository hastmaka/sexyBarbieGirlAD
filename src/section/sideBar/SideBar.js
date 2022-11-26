// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {NavLink} from "react-router-dom";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    backgroundColor: theme.palette.grey[0],
    alignItems: 'center',
    width: '160px',
    minWidth: '160px',
    height: '100vh',
    '& > button> svg': {
        cursor: 'pointer',
        fill: theme.palette.ecommerce.swatch_3,
        '&:hover': {
            fill: theme.palette.ecommerce.swatch_2,
        }
    }
}));

//----------------------------------------------------------------

export default function SideBar() {
    return (
        <RootStyle>
            <ul style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <NavLink to={'/admin-dashboard'}>Admin Dashboard</NavLink>
                <NavLink to={'/product-grid'}>product</NavLink>
                <NavLink to={'/order'}>order</NavLink>
                <NavLink to={'/test'}>test</NavLink>
            </ul>
        </RootStyle>
    );
}
