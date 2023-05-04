import {useSelector} from "react-redux";
// material
import {Alert, AlertTitle, Slide, Snackbar, Typography} from "@mui/material";
//
import {useLayoutEffect, useState} from "react";

//----------------------------------------------------------------
function GrowTransition(props) {
    return <Slide {...props} direction="down" />;
}

export default function EzNotification() {
    const {notification} = useSelector(slice => slice.admin);
    const [open, setOpen] = useState(false);
    //state to track existing notification
    const [notificationStack, setNotificationStack] = useState(null);

    useLayoutEffect(() => {
        if (!notificationStack && notification.content) {
            setNotificationStack({...notification, key: new Date().getTime()});
            setOpen(true)
        } else if (!!notificationStack) {
            setNotificationStack(null);
        }
    }, [notification]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway' && notification?.important) {
            return
        } else if (reason === 'escapeKeyDown' && notification?.important) {
            return
        }
        setOpen(false)
    };

    //restart snackbar state on exit
    const handleExited = () => setNotificationStack(null);

    return (
        <Snackbar
            key={notificationStack?.key || undefined}
            open={open}
            autoHideDuration={notification.timeout}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            onClose={handleClose}

            TransitionProps={{ onExited: handleExited }}
            TransitionComponent={GrowTransition}
        >
            <Alert
                onClose={_ => setOpen(false)}
                variant='filled'
                severity={notification.type}
                // sx={{
                //     fontSize: '13px !important',
                //     color: '#f7f8fa',
                //     backgroundColor: '#89007D',
                // }}
            >
                {notification.title !== '' && <AlertTitle sx={{fontWeight: 700}}>{notification.title}</AlertTitle>}
                <Typography
                    sx={{
                        fontSize: '11px'
                    }}
                    variant='span'
                >{notification.content}
                </Typography>
            </Alert>
        </Snackbar>
    );
}

/**
 * Different parameters to know where the notification comes from
 * @fromDb
 * @param title
 * @param type - 'error, info, success, warning'
 * @param content
 *
 * window.displayNotification({
 *   title: 'Done',
 *   type: 'info',
 *   content: 'Image Deleted Successfully'
 *})
 *
 * @local
 * @param type - 'error, info, success, warning'
 * @param content
 *
 * window.displayNotification({
 *   type: 'info',
 *   content: 'Image Deleted Successfully'
 * })
 */