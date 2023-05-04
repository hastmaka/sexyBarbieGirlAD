// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../../../../components/ezComponents/EzText/EzText";
import PropTypes from "prop-types";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    alignItems: 'center'
}));

//----------------------------------------------------------------

export default function ProductMediaStatusBar({item, progress}) {
    return (
        <RootStyle>
            <Stack direction='row' justifyContent='space-between' width='100%'>
                <EzText text='Number of Images Allow (4)'/>
                <EzText text={`${4 - item.image.length} left - ${item.image.filter(i => i.uploaded).length} uploaded`}/>
                <EzText
                    text={progress === 100 ? `Images Upload Complete ${progress}%` : 'Please Upload the Images'}
                    sx={{color: progress === 100 ? 'green' : 'red'}}
                />
            </Stack>
            <progress value={progress} max='100' style={{width: '100%'}}/>
        </RootStyle>
    );
}

ProductMediaStatusBar.prototype = {
    data: PropTypes.object.isRequired,
    progress: PropTypes.number
}