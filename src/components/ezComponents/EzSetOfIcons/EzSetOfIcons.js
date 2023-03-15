import PropTypes from "prop-types";
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

/**
 *
 * @param tooltip - tooltip title (required)
 * @param toolTipPosition
 * @param badgeValue
 * @param icon
 * @param functionality
 * @param refComponent - anchorEl for menu (required)
 * @param visibleOnMobile
 * @returns {JSX.Element}
 * @constructor
 */

export default function EzSetOfIcons({tooltip, toolTipPosition, badgeValue, icon, functionality, refComponent, visibleOnMobile}) {
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

EzSetOfIcons.defaultProps = {
    toolTipPosition: 'bottom'
}
EzSetOfIcons.propTypes = {
    tooltip: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    toolTipPosition: PropTypes.string,
    badgeValue: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
    ]),
    functionality: PropTypes.objectOf(PropTypes.func),
    refComponent: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any })
    ]),
}
