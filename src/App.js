import {lazy, Suspense, useEffect, useState} from "react";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import {adminSliceActions} from "./store/adminSlice";
import {useDispatch, useSelector} from "react-redux";
import Routes from './routes/index';
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import {useCheckScreen, useConfirmDialog, useNotification} from "./helper/hooks";
//async import
const EzModal = lazy(() => import('./components/ezComponents/EzModal/EzModal'))

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function App() {
    const dispatch = useDispatch();
    const {confirm} = useConfirmDialog();
    const {displayNotification} = useNotification();
    const {user, userStatus} = useSelector(slice => slice.admin);
    const [children, setChildren] = useState(null);

    //delete firebase emulator warning
    useEffect(_ => {
        const firebaseWarning = document.getElementsByClassName('firebase-emulator-warning');
        firebaseWarning[0].style.display = 'none'
    }, [])


    //check if user is authenticated

    //get screen size
    const screenSize = useCheckScreen();
    useEffect(_ => {
        dispatch(adminSliceActions.setScreen(screenSize))
    }, [screenSize]);

    useEffect(_ => {
        window.dispatch = dispatch;
        window.confirm = confirm;
        window.setChildren = setChildren;
        window.displayNotification = displayNotification;
    }, [])

    return (
        <RootStyle>
            <ScrollToTop/>
            {window.dispatch && <Routes/>}
            <Suspense fallback={<div>Loading Login...</div>}>
                <EzModal children={children}/>
            </Suspense>
        </RootStyle>
    );
}
