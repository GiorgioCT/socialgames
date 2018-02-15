import React,{Component} from 'react';
import{AppRegistry,Text,Image,View,StyleSheet,TouchableOpacity,TouchableWithoutFeedback,FlatList,KeyboardAvoidingView,StatusBar} from 'react-native';
import{Container,Header,Content,DeckSwiper,Card,CardItem,Thumbnail,Button,Label,Icon,Left,Body,Right,Grid,Col,Row,Input,Item,Spinner} from 'native-base';
import{LinearGradient} from 'expo';
import{addEventStart,addEventSuccess,addEventFailed} from '../actions/EventoActions';
import{userFetchStart,userFetchFailed,userFetchSuccess} from '../actions/Profilo';
import{bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
import {Picker} from 'native-base';



class CreaEvento extends Component{
  state={email:this.props.FetchProfilo.email,posti:"posti",piattaforma:"Xbox One",gioco:"gioco",data:"",ora:"",gamertag:this.props.FetchProfilo.gamertag,steam:this.props.FetchProfilo.steam,psn:this.props.FetchProfilo.psn,partecipanti:""}

  AggiungiEvento(){

    const{currentUser}=firebase.auth();
    if(this.state.piattaforma=="Xbox One"){
      var user={"email":this.state.email,"uid":currentUser.uid,"posti":this.state.posti,"piattaforma":this.state.piattaforma,"gioco":this.state.gioco,"data":this.state.data,"ora":this.state.ora,"utente":this.state.gamertag,"partecipanti":this.state.partecipanti};
    }
    else if(this.state.piattaforma=="Playstation 4"){
      var user={"email":this.state.email,"uid":currentUser.uid,"posti":this.state.posti,"piattaforma":this.state.piattaforma,"gioco":this.state.gioco,"data":this.state.data,"ora":this.state.ora,"utente":this.state.psn,"partecipanti":this.state.partecipanti};
    }
    else{
        var user={"email":this.state.email,"uid":currentUser.uid,"posti":this.state.posti,"piattaforma":this.state.piattaforma,"gioco":this.state.gioco,"data":this.state.data,"ora":this.state.ora,"utente":this.state.steam,"partecipanti":this.state.partecipanti};
    }


     firebase.database().ref(`/evento/`+this.props.indice)
     .set({email:user.email,uid:currentUser.uid,posti:user.posti,piattaforma:user.piattaforma,gioco:user.gioco,data:user.data,ora:user.ora,utente:user.utente,id:this.props.indice,partecipanti:user.partecipanti})
     .then(()=>{
       this.props.actions.addEventSuccess(),
       alert("Evento Creato")
     })
     .catch(error=>{this.props.actions.addEventFailed(error)});

  }



  render(){
    const navigate=this.props.navigate;

    return(
      <Container>
      <StatusBar hidden={true}/>
        <LinearGradient colors={['#db860f','#db380f']} style={{height:'100%',width:'100%'}}>
          <Row size={25} style={{justifyContent:'center',alignItems:'center',top:20}}>
            <Col style={{justifyContent:'center',alignItems:'center'}}>
              <Col style={{justifyContent:'space-around',alignItems:'center'}}>
                <Row style={{justifyContent:'space-around',alignItems:'center',width:80,height:50}}>
                  <Text style={{color:'white',fontSize:19,fontWeight:'bold'}}> GRUPPO </Text>
                </Row>
              </Col>
            </Col>
          </Row>
          <Row size={75} style={{bottom:100}}>
            <Col style={{justifyContent:'center'}}>
            <Picker
              selectedValue={this.state.piattaforma}
              prompt={"Seleziona la piattaforma"}
              onValueChange={(itemValue,itemIndex)=>this.setState({piattaforma:itemValue})}>
              <Picker.Item label="Xbox One" value="Xbox One"/>
              <Picker.Item label="Playstation 4" value="Playstation 4"/>
              <Picker.Item label="PC" value="PC"/>
            </Picker>

              <Item>
                <Label style={{color:'#E5F8FF'}}>Gioco: </Label>
                <Input maxLength={15} onChangeText={(gioco)=>this.setState({gioco})}/>
              </Item>
              <Item>
                <Label style={{color:'#E5F8FF'}}>Numero giocatori: </Label>
                <Input maxLength={2} keyboardType="numeric" onChangeText={(posti)=>this.setState({posti})}/>
              </Item>
              <DatePicker
                  style={styles.datepicker}
                  mode="date"
                  date={this.state.data}
                  minDate={new Date()}
                  placeholder="scegli il giorno"
                  placeholderTextColor='white'
                  format="DD-MM-YYYY"
                  androidMode='calendar'
                  hideText={false}
                  confirmBtnText="Conferma"
                  cancelBtnText="Cancella"
                  onDateChange={(date)=>this.setState({data:date})}
                  customStyles={{
                    placeholderText:{
                      color:'white'
                    },
                    dateIcon:{
                      position:'absolute',
                      left:0,
                      top:4,
                      marginLeft:10
                    },
                    dateInput:{
                      borderWidth:0.5,
                      borderColor:'white',
                      borderRadius:10
                    },
                    dateText:{
                      color:'white'
                    }
                  }}
                />
                <DatePicker
                    style={styles.datepicker}
                    mode="time"
                    placeholder="scegli l'ora di inizio"
                    date={this.state.ora}
                    placeholderTextColor='white'
                    hideText={false}
                    confirmBtnText="Conferma"
                    cancelBtnText="Cancella"
                    onDateChange={(date)=>{this.setState({ora:date})}}
                    customStyles={{
                      placeholderText:{
                        color:'white'
                      },
                      dateIcon:{
                        position:'absolute',
                        left:0,
                        top:4,
                        marginLeft:10
                      },
                      dateInput:{
                        borderWidth:0.5,
                        borderColor:'white',
                        borderRadius:10
                      },
                      dateText:{
                        color:'white'
                      }
                    }}
                />
              </Col>
          </Row>

          <Button style={{backgroundColor:'orange',alignSelf:'center',width:'80%',display:'flex',flexDirection:'row',justifyContent:'center',bottom:50}} onPress={()=>this.AggiungiEvento()}>
            <Text style={{fontSize:19,fontWeight:'bold',textAlign:'center',color:'grey'}}> CREA GRUPPO </Text>
          </Button>
        </LinearGradient>
      </Container>

    );
  }
}

function mapStateToProps(state){
  return{
    uid:state.auth.uid,
    userAuth:state.auth.user,
    FetchProfilo:state.FetchProfilo.profile,
    ProfileLoading:state.FetchProfilo.loading,
    indice:state.FetchEvento.length
  };
}

function mapDispatchToProps(dispatch){
  return{
    actions:{
      userFetchStart:bindActionCreators(userFetchStart,dispatch),
      userFetchFailed:bindActionCreators(userFetchFailed,dispatch),
      userFetchSuccess:bindActionCreators(userFetchSuccess,dispatch),
      addEventStart:bindActionCreators(addEventStart,dispatch),
      addEventFailed:bindActionCreators(addEventFailed,dispatch),
      addEventSuccess:bindActionCreators(addEventSuccess,dispatch)
    }
  };
}

const styles=StyleSheet.create({
  datepicker:{
    width:300,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'flex-end'
  }
  /*overlay:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    height:'100%',
    width:'100%'
  }*/
});

export default connect(mapStateToProps,mapDispatchToProps)(CreaEvento);
