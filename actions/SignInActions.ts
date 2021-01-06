import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const Credential = ({ prop, value }) => {
    console.log
    return {
        type: 'Credential_In',
        payload: { prop, value }
    }
}

export const TryLogin = (email: string, password: string ) => {
    return (dispatch) => {
        dispatch({ type: 'login_started' })
        auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch({ type: 'login_success', payload: user })
            }).catch(() => {
                dispatch({ type: 'login_failed' })
            })
    }
}

export const createAccountUser = ( email: string, password: string, address1: string,
    address2: string, firstName: string, lastName: string) => {
    return (dispatch) => {
        dispatch({ type: 'login_started' })
        auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                firestore()
                    .collection('Info').doc(user.user.uid)
                    .set({
                        firstName,
                        lastName,
                        address1,
                        address2,
                    }).then(() => {
                        dispatch({ type: 'create_account_success', payload: 'Account created successfully, Please login' })
                    }).catch(() => {
                        dispatch({ type: 'create_account_fail', payload: 'Failed to create account with those credentials, Please try again with different ones' })
                    })
            }).catch(() => {
                dispatch({ type: 'create_account_fail', payload: 'Failed to create account with those credentials, Please try again with different ones' })
            })
    }
}

export const signMeOut = () => {
    return (dispatch) => {
        auth().signOut().then(() => {
            dispatch({ type: 'sign_me_out_success' })
        }).catch(() => {
            dispatch({ type: 'sign_me_out_fail', payload: 'Sign Out Failed' })
        })
    }
}


export const EditUserInfo = ( uid: number, firstName: string, lastName: string, address1: string, 
    address2: string) => {
    return (dispatch) => {
        dispatch({ type: 'edit_start' })
        firestore()
            .collection('Info').doc(uid.toString())
            .set({
                firstName,
                lastName,
                address1,
                address2,
            }).then(() => {
                dispatch({ type: 'edit_success', payload: 'Changes saved' })
            }).catch(() => {
                dispatch({ type: 'edit_fail', payload: 'Error saving changes' })
            })
    }
}


export const resetErrorMessage = () => {
    return (dispatch) => {
        dispatch({ type: 'edit_out', payload: '' });
    }
}