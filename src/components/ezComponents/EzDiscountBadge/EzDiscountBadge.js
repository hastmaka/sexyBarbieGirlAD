// material
import {Stack, Typography} from '@mui/material';
import styled from 'styled-components';

//----------------------------------------------------------------

const RootStyle = styled(Stack)((props) => ({
    width: '150px',
    height: '150px',
    overflow: 'hidden',
    position: 'absolute',
    top: '29px',
    right: '121px',
    zIndex: '1',
    '& span': {
        left: '0',
        top: '30px',
        transform: 'rotate(45deg)',
        position: 'absolute',
        display: 'block',
        width: '200px',
        padding: '5px 0',
        textAlign: 'center',
        backgroundColor: props.theme.palette.ecommerce.badgeBgColor,
        boxShadow: `0 5px 10px ${'rgba(19, 19, 19, 0.6)'}`,
        color: props.theme.palette.ecommerce.darkGold,
        textShadow: `0 1px 1px ${'rgba(0, 0, 0, .2)'}`,
        border: `2px dotted ${props.theme.palette.ecommerce.gold}`,
        outline: `5px solid ${props.theme.palette.ecommerce.pink}`,
    }
}));

//----------------------------------------------------------------

export default function EzDiscountBadge() {
    return (
        <RootStyle>
            <Typography variant='span'>15% off</Typography>
        </RootStyle>
    );
}
