import {auth,} from "./FirebaseConfig";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import {getById} from "./FirestoreApi";

const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            return userCredential.user
        }).catch(e => {
            switch (e.code) {
                case 'auth/email-already-in-use':
                    return window.displayNotification({type: 'error', content: 'Email already in use, please choose another one'});
                default:
                    return window.displayNotification({type: 'error', content: 'Internal Error'})
            }
        })
};

const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            return userCredential.user
        }).catch(e => {
            switch (e.code) {
                case 'auth/wrong-password':
                    return window.displayNotification({type: 'error', content: 'Wrong Password, Double check Caps'});
                case 'auth/user-not-found':
                    return window.displayNotification({type: 'error', content: 'User not Found', important: true});
                case 'auth/too-many-requests':
                    return window.displayNotification({
                        type: 'error',
                        content: 'Too many request was made, try again later',
                        important: true
                    });
                default:
                    return window.displayNotification({type: 'error', content: 'Firebase Unknown Error'})
            }
        })
}

const logoutUser = () => {
    return signOut(auth);
}

const passwordResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
}

const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider);
}

const subscribeToAuthChanges = ( user) => {
    onAuthStateChanged(auth, async _ => {
        try {
            window.dispatch(getById({id: user.uid, collection: 'users'}))
        } catch (err) {
            console.log(err);
        }
    })
}

const FirebaseAuthService = {
    registerUser,
    loginUser,
    logoutUser,
    passwordResetEmail,
    loginWithGoogle,
    subscribeToAuthChanges
}

export default FirebaseAuthService;