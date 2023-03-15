import {useSelector} from "react-redux";
import {forwardRef} from "react";
// material
import {Button, Typography, Zoom} from "@mui/material";
import {styled} from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
//
import {useConfirmDialog} from "../../../helper/hooks/Hooks";

//----------------------------------------------------------------

const CustomButton = styled(Button)(({theme}) => ({
    border: '1px solid transparent',
    color: '#FFF',
    backgroundColor: '#f438de',
    '&:hover': {
        backgroundColor: '#ab1097'
    }
}))

const Transition = forwardRef(function Transition(props, ref) {
    return <Zoom direction="down" ref={ref} {...props} />;
});

//----------------------------------------------------------------
const getColor = (type) => {
    switch (type) {
        case 'info':
            return '#89007D';
        case 'warning':
            return '#ffa033';
        case 'success':
            return '#54D62C';
        default:
            return '#999'
    }
}

export default function EzConfirmDialog() {
    const {confirmDialog} = useSelector(slice => slice.admin);
    const {onConfirm, onCancel} = useConfirmDialog();
    let fontColor = confirmDialog.type === 'info' ? '#B78103' : '';

    let name = '',
        phrase = '';
    if(confirmDialog.content !== '') {
        name = confirmDialog.content.split(' ').splice(-1).join(' ');
        phrase = confirmDialog.content.split(' ').slice(0, -1).join(' ');
    }

    return (
        <Dialog
            open={confirmDialog.open}
            onClose={(e, reason) => {
                // debugger
            }}
            TransitionComponent={Transition}
            maxWidth='lg'
            transitionDuration={{enter: 200, exit: 500}}
            aria-describedby="confirm_dialog"
            sx={{
                '& .MuiDialog-paper': {
                    margin: 0,
                    borderRadius: '4px',
                    // backgroundColor: '#a43a73',
                    width: '400px'
                }
            }}
        >
            <DialogTitle sx={{color: getColor(confirmDialog.type)}}>{confirmDialog.title}</DialogTitle>
            <DialogContent
                sx={{
                    color: getColor(confirmDialog.type),
                    display: 'flex',
                    flexDirection: 'row'
                }}
                dividers
            >
                {phrase} 
                <Typography variant='span' sx={{fontWeight: 700}}>'{name}'</Typography>
            </DialogContent>

            <DialogActions>
                <CustomButton
                    variant='contained'
                    onClick={onCancel}
                >Cancel</CustomButton>
                <CustomButton
                    variant='contained'
                    onClick={onConfirm}
                >OK</CustomButton>
            </DialogActions>

        </Dialog>
    );
}
