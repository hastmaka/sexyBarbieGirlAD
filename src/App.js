import {useEffect} from "react";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import {adminSliceActions} from "./store/adminSlice";
import {useCheckScreen, useConfirmDialog, useNotification} from "./helper/Hooks";
import {useDispatch, useSelector} from "react-redux";
import Routes from './routes/index';
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import {getAll} from "./helper/FirestoreApi";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function App() {
    const dispatch = useDispatch();
    const {confirm} = useConfirmDialog();
    const {displayNotification} = useNotification();
    const {user, userStatus} = useSelector(slice => slice.admin);

    useEffect(() => {
        if (!userStatus.loading && !userStatus.loaded) {
            dispatch(getAll({collection: 'products'}))
            // dispatch(getAll({collection: 'filters'}))
        }
    }, [dispatch, userStatus]);

    //get screen size
    const screenSize = useCheckScreen();
    useEffect(_ => {
        dispatch(adminSliceActions.setScreen(screenSize))
    }, [screenSize]);

    useEffect(_ => {
        window.dispatch = dispatch;
        window.confirm = confirm;
        window.displayNotification = displayNotification;
    }, [])

    return (
        <RootStyle>
            <ScrollToTop/>
            <Routes/>
        </RootStyle>
    );
}
