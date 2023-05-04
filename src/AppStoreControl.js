// material
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {getById} from "./helper/firebase/FirestoreApi";


export default function AppStoreControl(props) {
    const localStoreUser = JSON.parse(localStorage.getItem('user'));
    const {userStatus} = useSelector(slice => slice.admin);

    // useEffect(_ => {
    //     if(userStatus.loaded) {
    //         // window.dispatch(getById({id: localStoreUser.uid, collection: localStoreUser.selectedValue}))
    //         // window.dispatch(getUserTableData({
    //         //     uid: localStoreUser.uid,
    //         //     collection: localStoreUser.selectedValue,
    //         //     monthAndYear: getActualMonthAndYear()
    //         // }))
    //     }
    // }, [userStatus.loaded])


    useEffect(_ => {
        //check if the user is already sign in on reload
        import('./helper/firebase/FirebaseAuthService').then(module => {
            module.subscribeToAuthChanges(localStoreUser)
        })
    }, [])


    return (
        <>
            {userStatus.loaded && props.children}
        </>
    );
}