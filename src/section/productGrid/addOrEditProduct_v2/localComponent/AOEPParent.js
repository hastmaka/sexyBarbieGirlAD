// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import PropTypes from "prop-types";
import AOEPChild_2 from "./AOEPChild_2";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    gap: '24px',
    alignItems: 'center'
}));

//----------------------------------------------------------------

export default function AOEPParent({children, ...rest}) {
    return (
        <RootStyle {...rest}>
            {children}
        </RootStyle>
    );
}
AOEPParent.prototype = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
}