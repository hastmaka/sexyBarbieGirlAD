import {doc, setDoc, collection} from "firebase/firestore";
import {db} from "./firebase/FirebaseConfig";
import {adminSliceActions} from "../store/adminSlice";

export const createAccountProcess = async ({user}) => {
    // 1 - super admin
    // 2 - admin
    // 3 - moderator
    // 4 - support
    const tempUser = {
        email: user.email,
        provider: user.providerData[0].providerId,
        emailVerified: user.emailVerified,
        rol: 2
    }
    try{
        //create user in db
        await setDoc(doc(db, 'admin_dashboard_users', user.uid), tempUser)
        return ('created')
    } catch (err) {
        return(err)
    }
}

export const loginProcess = ({firebaseUser, dbUser, navigate, from}) => {
    let tempAccessToken = from === 'google' ? firebaseUser.user.accessToken : firebaseUser.accessToken
    localStorage.setItem('user', JSON.stringify({uid: dbUser.uid}))
    window.dispatch(adminSliceActions.setUser({...dbUser, token: tempAccessToken}))
    window.displayNotification({
        type: 'success',
        content: `Welcome ${dbUser.email}`
    })
    navigate(`/admin-dashboard`)
}


export const logOut = (navigate) => {
    localStorage.removeItem('user')
    navigate('/login')
    window.location.reload()
}