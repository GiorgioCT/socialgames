import {combineReducers} from 'redux';
import authReducer from './authReducer';
import Registrazione from './Registrazione';
import UpdateProfilo from './UpdateProfilo';
import FetchProfilo from './FetchProfilo';
import EventoReducer from './EventoReducer';
import FetchEvento from './FetchEvento';




const appReducer=combineReducers({
  auth:authReducer,
  registrazione:Registrazione,
  UpdateProfilo:UpdateProfilo,
  FetchProfilo:FetchProfilo,
  EventoReducer:EventoReducer,
  FetchEvento:FetchEvento

});
export default appReducer;
