import {REGISTER_USER_START,REGISTER_USER_SUCCESS,REGISTER_USER_FAIL} from './types';
import firebase from 'firebase';
export const RegistrazioneUtente=({email,password})=>{
  return (dispatch)=>{
    dispatch({type:REGISTER_USER_START});
    console.log(email);
    console.log(password);
    firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(user=>RegisterSuccess(dispatch,user))
        .catch(error=>RegisterFail(dispatch,error));
  }
}

const RegisterSuccess=(dispatch,user)=>{
  console.log("Registrazione completata");
  dispatch({type:REGISTER_USER_SUCCESS,payload:user});
  alert("Registrazione completata. Torna indietro e fai il login")
  const{currentUser}=firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}`)
  .set({nome:'Nome',cognome:'Cognome',età:'Età',città:'Città',email:user.email,gamertag:'Gamertag',psn:'Psn',steam:'Steam'})
}

const RegisterFail=(dispatch,error)=>{
  alert(error.code);
  console.log("Registrazione fallita");
  dispatch({type:REGISTER_USER_FAIL,payload:error})
}
