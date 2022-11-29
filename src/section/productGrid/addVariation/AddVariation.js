// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    height: '300px',
    width: '100%'
}));

//----------------------------------------------------------------

export default function AddVariation() {
    return (
        <RootStyle>
            add
        </RootStyle>
    );
}
