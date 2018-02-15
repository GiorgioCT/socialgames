import {LOGIN_USER_START,LOGIN_USER_SUCCESS,LOGIN_USER_FAIL} from './types';
import firebase from 'firebase';
import {NavigationActions} from 'react-navigation';
export const loginUser=({email,password,navigateTo,navigation})=>{
  return (dispatch)=>{
    dispatch({type:LOGIN_USER_START});
    console.log("action di login",email,password);
    console.log(email);
    firebase.auth().signInWithEmailAndPassword(email,password).
    then((user)=>loginUserSuccess(user,dispatch,navigateTo,navigation)).catch(error=>loginUserFailed(error,dispatch));
  }
}

const loginUserSuccess=(user,dispatch,navigateTo,navigation)=>{
  dispatch({
    type:LOGIN_USER_SUCCESS,
    email:user.email,
    uid:user.uid,
  });
  navigation.dispatch(resetAction)
}

const loginUserFailed=(error,dispatch)=>{
  var errorMessage=error.message;
  console.log(errorMessage);
  alert(error);
  dispatch({
    type:LOGIN_USER_FAIL,
    payload:error.message
  });
}

const resetAction=NavigationActions.reset({
  index:0,
  actions:[
    NavigationActions.navigate({routeName:'Home'})
  ]
})
