// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    backgroundColor: theme.palette.ecommerce.toolBarAndSideBarBg,
    width: '100%',
    height: '50px'
}));

//----------------------------------------------------------------

export default function Test() {
    return (
        <RootStyle>
            test
        </RootStyle>
    );
}
