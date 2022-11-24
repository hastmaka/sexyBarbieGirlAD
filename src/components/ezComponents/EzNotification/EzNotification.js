import {useSelector} from "react-redux";
// material
import {Alert, AlertTitle, Grow, Snackbar, Typography} from "@mui/material";
//
import {useNotification} from "../../../helper/Hooks";

//----------------------------------------------------------------

function GrowTransition(props) {
    return <Grow {...props} />;
}

export default function EzNotification() {
    const {clearNotification} = useNotification();
    const {notification} = useSelector(slice => slice.admin);

    return (
        <Snackbar
            open={notification.open}
            autoHideDuration={notification.timeout}
            onClose={(e, reason) => {
                if(!(reason === 'clickaway')) {
                    clearNotification()
                } else if (reason === 'escapeKeyDown') {
                    clearNotification()
                }
            }}
            TransitionComponent={GrowTransition}
        >
            <Alert
                onClose={_ => clearNotification()}
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