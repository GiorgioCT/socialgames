import React,{Component} from 'react';
import {AppRegistry,Text,Image,View,StyleSheet,TouchableOpacity,TouchableWithoutFeedback,FlatList,KeyboardAvoidingView,StatusBar,ScrollView} from 'react-native';
import{Container,Header,Content,DeckSwiper,Card,CardItem,Thumbnail,Button,Label,Icon,Left,Body,Right,Grid,Col,Row,Input,Item,Spinner} from 'native-base';
import{LinearGradient} from 'expo';
import{eventFetchStart,eventFetchSuccess,eventFetchFailed} from '../actions/EventoActions.js';
import{bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import{profileUpdateStart,profileUpdateSuccess,profileUpdateFailed,userFetchStart,userFetchSuccess,userFetchFailed} from '../actions/Profilo.js';

import * as firebase from 'firebase';
class Gruppi extends Component{
  async componentDidMount(){
    const{currentUser}=firebase.auth();
    this.props.actions.eventFetchStart();
    firebase.database().ref(`/evento`).once('value').
    then((snapshot)=>{
      this.props.actions.eventFetchSuccess(snapshot.val())}).
    catch(error=>this.props.actions.eventFetchFailed(error));
  }

  stampa(item){
    const{currentUser}=firebase.auth();
    var day=new Date();
    if(item.uid==currentUser.uid) {
      return(
        <TouchableOpacity activeOpacity={0.6} >
          <Card style={{alignSelf:'center',width:'98%',borderRadius:5}}>
          <Item>
            <Text style={styles.dato1}> Evento creato da {item.utente}</Text>
          </Item>
          <Item>
            <Text style={styles.dato1}> piattaforma di gioco {item.piattaforma}</Text>
          </Item>
          <Item>
            <Text style={styles.dato1}> Gioco: {item.gioco}</Text>
          </Item>
          <Item>
            <Text style={styles.dato1}> Posti rimanenti {item.posti}</Text>
          </Item>
          <Item>
            <Text style={styles.dato1}> Data {item.data} Ora {item.ora}</Text>
          </Item>
          <Item>
            <Text style={styles.dato1}> Partecipanti: {item.partecipanti}</Text>
          </Item>
        </Card>
      </TouchableOpacity>
      );
    }
  }


  render(){
    const navigate=this.props.navigate;

    return(
      <Container>
        <StatusBar hidden={true}/>
        <LinearGradient colors={['#db860f','#db380f']} style={{height:'100%',width:'100%'}}>
          <ScrollView>
            <FlatList
              data={this.props.FetchEvento}
              keyExtractor={(item)=>{return item.id}}
              renderItem={({item})=>this.stampa(item)}
            />
          </ScrollView>
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
    FetchEvento:state.FetchEvento.evento,
    EventoLoading:state.FetchEvento.loading
  };
}

function mapDispatchToProps(dispatch){
  return{
    actions:{
      profileUpdateStart:bindActionCreators(profileUpdateStart,dispatch),
      profileUpdateFailed:bindActionCreators(profileUpdateFailed,dispatch),
      profileUpdateSuccess:bindActionCreators(profileUpdateSuccess,dispatch),
      userFetchStart:bindActionCreators(userFetchStart,dispatch),
      userFetchFailed:bindActionCreators(userFetchFailed,dispatch),
      userFetchSuccess:bindActionCreators(userFetchSuccess,dispatch),
      eventFetchStart:bindActionCreators(eventFetchStart,dispatch),
      eventFetchSuccess:bindActionCreators(eventFetchSuccess,dispatch),
      eventFetchFailed:bindActionCreators(eventFetchFailed,dispatch),
    }
  };
}

const styles=StyleSheet.create({
  /*container:{
    justifyContent:'center',
    alignItems:'center',
    shadowOffset:{height:2},
    shadowColor:'black',
    shadowOpacity:0.2,
    backgroundColor:'#ecf0f1'
  },*/
  dato1:{
    marginTop:5,
    fontSize:14,
    fontWeight:'bold',
    textAlign:'center',
    color:'black',
    backgroundColor:'transparent'
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(Gruppi)
