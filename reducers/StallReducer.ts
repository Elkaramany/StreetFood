interface Props {
  name: string,
  providedPicture: boolean,
  location: string,
  vegetarian: boolean,
  description: string,
  allStalls: string[],
  stallLoading: boolean
}

const INITIAL_STATE: Props = {
  name: '',
  location: '',
  description: '',
  vegetarian: false,
  providedPicture: false,
  allStalls: [],
  stallLoading: false
}

export default (state = {INITIAL_STATE}, action) => {
    if (action.type === 'Credential_In') {
      return {...state, [action.payload.prop]: action.payload.value}
    }else if(action.type === 'fetch_stalls_success'){
      return{...state, allStalls: action.payload}
    }else if(action.type === 'sign_me_out_success'){
      return{...state, ...INITIAL_STATE}
    }else if(action.type === 'flipLoading'){
      return{...state, stallLoading: action.payload}
    }
    return state
  }
