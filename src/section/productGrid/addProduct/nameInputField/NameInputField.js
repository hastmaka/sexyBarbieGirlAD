// material
import {Stack, TextField, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../../../components/ezComponents/EzText/EzText";
import EzTextField from "../../../../components/ezComponents/EzTextField/EzTextField";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px'
}));

//----------------------------------------------------------------

export default function NameInputField({text, name, ...field}) {
    return (
        <RootStyle>
            <EzText text={text}/>
            <EzTextField
                name={name}
                size='small'
                required
                {...field}
            />
        </RootStyle>
    );
}
