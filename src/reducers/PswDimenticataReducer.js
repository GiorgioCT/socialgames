import {FORGET_PASSWORD_SUCCESS,FORGET_PASSWORD_FAIL} from '../actions/types';
const initialState={
  email:'',
  error:''
}

export default(state=initialState,action)=>{
  switch(action.type){
    case FORGET_PASSWORD_SUCCESS:
      console.log("entrato in forget password success");
      return{
        ...state,
        email:action.payload,
        error:'OK',
      }

    case FORGET_PASSWORD_FAIL:
      console.log("entrato in forget password fail");
      return{
        ...state,
        email:'',
        error:action.error,
      }

      default:return state;
  }
}
