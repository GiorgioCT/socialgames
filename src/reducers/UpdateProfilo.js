import{PROFILE_UPDATE_FAIL,PROFILE_UPDATE_START,PROFILE_UPDATE_SUCCESS} from '../actions/types';
const initialState={
  error:'',
  loading:true
}

export default (state=initialState,action)=>{
  console.log("SONO NEL REDUCER: " + action.type);
  switch(action.type){
    case PROFILE_UPDATE_START:
      console.log("ENTRATO IN PROFILE_UPDATE_START");
      return{
        ...state,
        loading:true,
        error:''
      }
    case PROFILE_UPDATE_SUCCESS:
      console.log("ENTRATO IN PROFILE_UDPATE_SUCCESS");
      return{
        ...state,
        loading:false,
        error:''
      }
    case PROFILE_UPDATE_FAIL:
      console.log("ENTRATO IN PROFILE_UPDATE_FAIL");
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    default:return state;
  }
}
