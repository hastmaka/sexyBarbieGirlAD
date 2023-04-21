// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import PropTypes from "prop-types";
import AOEPChild_2 from "./AOEPChild_2";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flex: 1,
    alignItems: 'flex-end',
}));

//----------------------------------------------------------------

export default function AOEPChild_1({children, ...rest}) {
    return (
        <RootStyle {...rest}>
            {children}
        </RootStyle>
    );
}

AOEPChild_1.prototype = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
}