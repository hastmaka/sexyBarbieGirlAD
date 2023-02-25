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

export default function EzModalWithTransition({open, handleClose, children, who}) {
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
                    width: who === 'variation' ? '100%' : 'fit-content'
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
                    right: '3px',
                    top: '3px',
                    zIndex: 1000,
                    '& > svg': {
                        fill: '#fff'
                    }
                }}
            />
            {children}
        </Dialog>
    );
}
