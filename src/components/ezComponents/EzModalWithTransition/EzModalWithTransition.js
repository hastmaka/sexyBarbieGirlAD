// material
import {Dialog, Zoom} from "@mui/material";
import {forwardRef} from "react";
import CloseIcon from '@mui/icons-material/Close';
import EzIconButton from "../EzIconButton/EzIconButton";

//----------------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
    return <Zoom direction="down"  ref={ref} {...props} />;
});

//----------------------------------------------------------------

export default function EzModalWithTransition({open, handleClose, children}) {
    // debugger
    return (
        <Dialog
            open={open.bool || open}
            onClose={(e, reason) => {
                // debugger
            }}
            TransitionComponent={Transition}
            maxWidth='lg'
            // keepMounted
            transitionDuration={{enter: 200, exit: 500}}
            aria-describedby="modal_with_transition"
            sx={{
                '& .MuiPaper-elevation': {
                    position: 'relative',
                },
                '& .MuiDialog-paper': {
                    margin: 0,
                    borderRadius: '4px',
                    width: '100%'
                }
            }}
        >
            <EzIconButton
                icon={<CloseIcon/>}
                size='large'
                // toolTipTitle='Close'
                onClick={handleClose}
                sx={{
                    fontSize: '14px',
                    position: 'absolute',
                    right: 0,
                    zIndex: 1000,
                    '& > svg': {
                        fill: '#999'
                    }
                }}
            />
            {children}
        </Dialog>
    );
}
