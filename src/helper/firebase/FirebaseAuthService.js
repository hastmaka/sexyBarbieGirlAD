import {auth,} from "./FirebaseConfig";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    getIdToken
} from 'firebase/auth';
import {getById, getUser} from "./FirestoreApi";
import {adminSliceActions} from "../../store/adminSlice";

export const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            return userCredential.user
        }).catch(e => {
            debugger
            switch (e.code) {
                case 'auth/email-already-in-use':
                    return window.displayNotification({
                        type: 'error',
                        content: 'Email already in use, please choose another one'
                    });
                default:
                    return window.displayNotification({
                        type: 'error',
                        content: 'Internal Error'
                    });
            }
        })
};

export const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            return userCredential.user
        }).catch(e => {
            switch (e.code) {
                case 'auth/wrong-password':
                    return window.displayNotification({
                        type: 'error',
                        content: 'Wrong Password, Double check Caps'
                    });
                case 'auth/user-not-found':
                    return window.displayNotification({
                        type: 'error',
                        content: 'User not Found',
                        important: true
                    });
                case 'auth/too-many-requests':
                    return window.displayNotification({
                        type: 'error',
                        content: 'Too many request was made, try again later',
                        important: true
                    });
                default:
                    return window.displayNotification({
                        type: 'error',
                        content: 'Firebase Unknown Error'
                    })
            }
        })
}

export const logoutUser = () => {
    return signOut(auth);
}

export const passwordResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
}

export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider);
}

export const subscribeToAuthChanges = () => {
    onAuthStateChanged(auth, async firebaseUser => {
        let token = await getIdToken(firebaseUser);
        try {
            const user = await getUser(firebaseUser.uid);
            window.dispatch(adminSliceActions.setUser({...user, token}))
        } catch (err) {
            console.log(err);
        }
    })
}