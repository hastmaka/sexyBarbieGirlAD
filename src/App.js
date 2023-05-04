import {lazy, Suspense, useEffect, useState} from "react";
//
import {useDispatch, useSelector} from "react-redux";
import Router from './routes';
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import {useConfirmDialog, useNotification} from "./helper/hooks";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {addNeededSlices, verifySession} from "./AppController";
import AppStoreControl from "./AppStoreControl";
import Login from './section/login/Login'
//dynamic import
const EzModal = lazy(() => import('./components/ezComponents/EzModal/EzModal'))
const CreateAccount = lazy(() => import('./section/login/CreateAccount'))
const ForgotPassword = lazy(() => import('./section/login/ForgotPassword'))

//----------------------------------------------------------------

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {confirm} = useConfirmDialog();
    const {displayNotification} = useNotification();
    const {user, userStatus} = useSelector(slice => slice.admin);
    const [children, setChildren] = useState(null);
    const [runApp, setRunApp] = useState(false);

    //delete firebase emulator warning
    useEffect(_ => {
        const firebaseWarning = document.getElementsByClassName('firebase-emulator-warning');
        firebaseWarning[0].style.display = 'none'
    }, [])

    // check if the user is logged in and has credentials
    useEffect(_ => {
        if (!verifySession() && !['/login', '/create-account', '/forgot-password'].includes(location.pathname)) {
            navigate('/login')
        }
    }, [location]);


    //check if user is authenticated

    useEffect(_ => {
        window.dispatch = dispatch;
        window.confirm = confirm;
        window.setChildren = setChildren;
        window.displayNotification = displayNotification;
    }, [])

    return (
        <>
            <Suspense fallback={<div>Loading Login...</div>}>
                <EzModal children={children}/>
            </Suspense>
            {!runApp && !verifySession() ?
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/create-account' element={<Suspense fallback={<p>Loading...</p>}>{<CreateAccount/>}</Suspense>}/>
                    <Route path='/forgot-password' element={<Suspense fallback={<p>Loading...</p>}>{<ForgotPassword/>}</Suspense>}/>
                    <Route path='*' to='/login' element={<Login/>}/>
                </Routes> :
                runApp ?
                    <AppStoreControl>
                        <Router/>
                    </AppStoreControl> :
                    addNeededSlices(
                        setRunApp,
                        dispatch,
                        confirm,
                        setChildren,
                        displayNotification
                    )
            }
        </>
    );
}
