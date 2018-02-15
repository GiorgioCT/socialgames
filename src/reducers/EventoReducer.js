import {ADD_EVENT_START,ADD_EVENT_SUCCESS,ADD_EVENT_FAIL} from '../actions/types';
const initialState={
  error:'',
  loading:true

}

export default(state=initialState,action)=>{
  console.log("SONO NEL REDUCER: "+action.type);
  switch(action.type){
    case ADD_EVENT_START:
      console.log("ENTRATO IN ADD_EVENT_START");
      return{
        ...state,
        loading:true,
        error:''
      }
    case ADD_EVENT_SUCCESS:
      console.log("ENTRATO IN ADD_EVENT_SUCCESS");
      return{
        ...state,
        loading:false,
        error:''

      }
    case ADD_EVENT_FAIL:
      console.log("ENTRATO IN ADD_EVENT_FAIL");
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    default:return state;
  }
}
