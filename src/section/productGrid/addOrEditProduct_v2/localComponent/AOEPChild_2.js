// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import PropTypes from "prop-types";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flex: 2
}));

//----------------------------------------------------------------

export default function AOEPChild_2({children, ...rest}) {
    return (
        <RootStyle {...rest}>
            {children}
        </RootStyle>
    );
}

AOEPChild_2.prototype = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
}