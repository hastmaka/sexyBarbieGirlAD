// material
import {IconButton, Tooltip} from '@mui/material';
import styled from 'styled-components';
//
import EzBadge from '../EzBadge/EzBadge';
//----------------------------------------------------------------

const IconContainer = styled(IconButton)(({visibleonmobile, theme}) => ({
    [theme.breakpoints.down('lg')]: {
        display: visibleonmobile === 1 ? 'flex' : 'none',
    }
}));

//----------------------------------------------------------------

export default function EzSetOfIcons({tooltip, toolTipPosition = 'bottom', badgeValue, icon, functionality, refComponent, visibleOnMobile}) {
    return (
        <>
            <Tooltip title={tooltip} arrow placement={toolTipPosition}>
                <IconContainer {...functionality} ref={refComponent} visibleonmobile={visibleOnMobile}>
                    {badgeValue > 0 ?
                        <EzBadge badgeValue={badgeValue}>
                            {icon}
                        </EzBadge> :
                        icon
                    }
                </IconContainer>
            </Tooltip>
        </>
    );
}
