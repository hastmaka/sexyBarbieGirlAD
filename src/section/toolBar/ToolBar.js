// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    height: '60px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    backgroundColor: theme.palette.ecommerce.bg_parent
}));

//----------------------------------------------------------------

export default function ToolBar() {
    return (
        <RootStyle>
            <Stack>Overview</Stack>
            <Stack flexDirection='row'>
                <Stack>icon 1</Stack>
                <Stack>icon 2</Stack>
                <Stack>icon 3</Stack>
            </Stack>
        </RootStyle>
    );
}
