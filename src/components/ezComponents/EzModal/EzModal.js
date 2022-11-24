// material
import {Backdrop, Modal, Stack} from '@mui/material';
import styled from 'styled-components';

//----------------------------------------------------------------

const ChildContainer = styled(Stack)(({theme}) => ({
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 0,
}))

//----------------------------------------------------------------

export default function EzModal({open, handleClose, children}) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <ChildContainer>
                {children}
            </ChildContainer>
        </Modal>
    );
}