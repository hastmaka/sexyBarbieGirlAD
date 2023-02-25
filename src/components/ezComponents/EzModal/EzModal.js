// material
import {Dialog, Zoom} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import {forwardRef} from "react";
import {useSelector} from "react-redux";
import EzCustomIconButton from "../EzCustomIconButton/EzCustomIconButton";
import {adminSliceActions} from "../../../store/adminSlice";

//----------------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
    return <Zoom direction="down"  ref={ref} {...props} />;
});

//----------------------------------------------------------------

export default function EzModal({children}) {
    const {modal} = useSelector(slice => slice.admin)
    // debugger
    return (
        <Dialog
            open={modal.open}
            onClose={(e, reason) => {
                // debugger
            }}
            TransitionComponent={Transition}
            maxWidth='lg'
            // keepMounted
            transitionDuration={{enter: 200, exit: 500}}
            aria-describedby="modal_with_transition"
            sx={{
                '& .MuiDialog-paper': {
                    margin: 0,
                    borderRadius: '4px',
                    width: !modal.who ? '100%' : null
                }
            }}
        >
            <EzCustomIconButton
                icon={<CloseIcon/>}
                // toolTipTitle='Close'
                onClick={_ => window.dispatch(adminSliceActions.closeModal())}
                sx={{
                    position: 'fixed',
                    right: {xs: '19px', md: 0},
                    top: {xs: '27px', md: 0},
                    margin: '10px',
                    zIndex: 1000
                }}
            />
            {children}
        </Dialog>
    );
}