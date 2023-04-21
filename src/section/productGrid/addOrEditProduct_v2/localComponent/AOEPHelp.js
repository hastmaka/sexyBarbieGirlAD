import PropTypes from "prop-types";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../../../components/ezComponents/EzText/EzText";
import EzIconButton from "../../../../components/ezComponents/EzIconButton/EzIconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'center',
}));

//----------------------------------------------------------------

export default function AOEPHelp({text, helpText}) {
    return (
        <RootStyle>
            <EzText text={text}/>
            <EzIconButton
                icon={
                    <HelpOutlineIcon
                        sx={{
                            fill: '#999 !important',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                fill: '#4d4d4d !important'
                            }
                        }}
                    />
            }
                toolTipTitle={helpText}
                size='small'
            />
        </RootStyle>
    );
}

AOEPHelp.prototype = {
    text: PropTypes.string.isRequired,
    helpText: PropTypes.string.isRequired,
}