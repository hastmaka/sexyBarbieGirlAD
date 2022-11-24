import {useLocation,} from 'react-router-dom';
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    color: '#999'
}));

//----------------------------------------------------------------

export default function EzBreadcrumb() {
    const location = useLocation();
    return (
        <RootStyle>
            Home / Product / NePZx7zVrpIgUvHSSaKu
        </RootStyle>
    );
}
