interface Props {
  email: string
  password: string
  firstName: string
  lastName: string
  address1: string
  address2: string
  phone: string
  uid: null | number
  user: object | null
  errorMessage: string
  loading: boolean
  editLoading: boolean
  navigated: boolean
}

const INITIAL_STATE: Props = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  phone: '',
  uid: null,
  user: null,
  errorMessage: '',
  loading: false,
  editLoading: false,
  navigated: false,
}

export default (state = {INITIAL_STATE}, action) => {
  if (action.type === 'Credential_In') {
    return {...state, [action.payload.prop]: action.payload.value}
  } else if (action.type === 'login_success') {
    return {...state, ...INITIAL_STATE, user: action.payload}
  } else if (action.type === 'login_failed') {
    return {
      ...state,
      ...INITIAL_STATE,
      errorMessage: 'Email or password is incorrect',
    }
  } else if (
    action.type === 'create_account_success' ||
    action.type === 'create_account_fail'
  ) {
    return {...state, ...INITIAL_STATE, errorMessage: action.payload}
  } else if (action.type === 'login_started') {
    return {...state, loading: true}
  } else if (
    action.type === 'edit_success' ||
    action.type === 'edit_fail' ||
    action.type === 'sign_me_out_fail' ||
    action.type === 'edit_out'
  ) {
    return {...state, editLoading: false, errorMessage: action.payload}
  } else if (action.type === 'edit_start') {
    return {...state, editLoading: true}
  } else if (action.type === 'sign_me_out_success') {
    return {...state, ...INITIAL_STATE}
  }
  return state
}
