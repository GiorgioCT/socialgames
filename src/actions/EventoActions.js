import{ADD_EVENT_START,ADD_EVENT_SUCCESS,ADD_EVENT_FAIL,EVENT_FETCH_START,EVENT_FETCH_FAIL,EVENT_FETCH_SUCCESS} from './types';
import * as firebase from 'firebase';
export const addEventStart=()=>{
  return {type:ADD_EVENT_START}
}

export const addEventSuccess=()=>{
  return{type:ADD_EVENT_SUCCESS}
}

export const addEventFailed=(error)=>{
  var errorMessage=error.message;
  console.log(errorMessage);
  alert(error);
  return{
    type:ADD_EVENT_FAIL,
    payload:error.message
  }
}

export const eventFetchStart=()=>{
  return{
    type:EVENT_FETCH_START
  }
}

export const eventFetchSuccess=(evento)=>{
  return{
    type:EVENT_FETCH_SUCCESS,
    payload:evento
  }
}

export const eventFetchFailed=(error)=>{
  var errorMessage=error.message;
  console.log(errorMessage);
  alert(error);
  return{
    type:EVENT_FETCH_FAIL,
    payload:error.message
  }
}
