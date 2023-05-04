// material
import {Button, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {handleProductSave, handleProductUpdate} from "./AOEPController";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

const CustomButton = styled(Button)(({theme}) => ({
    color: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[100]}`,
    '&:hover': {
        color: theme.palette.grey[400],
        border: `1px solid ${theme.palette.grey[400]}`,
    }
}))

//----------------------------------------------------------------

export default function AOEPSave({tempProduct, editMode}) {
    return (
        <RootStyle>
            <CustomButton
                variant='outlined'
                onClick={_ => editMode ? handleProductUpdate(tempProduct) : handleProductSave(tempProduct)}
            >{editMode ? 'Update' : 'Save'}</CustomButton>
        </RootStyle>
    );
}
