// material
import {Badge} from '@mui/material';
import styled from 'styled-components';

//----------------------------------------------------------------

const RootStyle = styled(Badge)((props) => ({
    '& .MuiBadge-badge': {
        right: -2,
        top: -2,
        border: `2px solid ${props.theme.palette.background.paper}`,
        backgroundColor: `${props.theme.palette.ecommerce.pink_2}`,
        color: `${props.theme.palette.ecommerce.gold}`,
        padding: '0 4px',
    },
}));

//----------------------------------------------------------------

export default function EzBadge(props) {
    return (
        <RootStyle badgeContent={props.badgeValue}>
            {props.children}
        </RootStyle>
    );
}
