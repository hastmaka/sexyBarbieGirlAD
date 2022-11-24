// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function TopProduct() {
    return (
        <RootStyle>
            top product
        </RootStyle>
    );
}
