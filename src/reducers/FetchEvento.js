import{EVENT_FETCH_START,EVENT_FETCH_SUCCESS,EVENT_FETCH_FAIL} from '../actions/types';
const initialState={
  error:'',
  loading:true,
  evento:null,
  length:0
}

export default(state=initialState,action)=>{
  console.log("SONO NEL REDUCER:"+action.type);
  switch(action.type){
    case EVENT_FETCH_START:
      console.log("ENTRATO IN EVENT_FETCH_START");
      return{
        ...state,
        loading:true,
        error:''
      }
    case EVENT_FETCH_SUCCESS:
      console.log("ENTRATO IN EVENT_FETCH_SUCCESS");
      console.log(action.payload);

      return{
        ...state,
        loading:false,
        evento:action.payload,
        error:'',
        length:action.payload.length
      }


    case EVENT_FETCH_FAIL:
      console.log("ENTRATO IN EVENT_FETCH_FAIL");
      return{
        ...state,
        loading:false,
        evento:'',
        error:action.payload
      }
    default:return state;
  }
}
