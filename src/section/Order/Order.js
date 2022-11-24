// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function Order() {
    return (
        <RootStyle>
            order
        </RootStyle>
    );
}
