import React,{Component} from 'react';
import{AppRegistry,Text,Image,View,StyleSheet,TouchableOpacity,TouchableWithoutFeedback,FlatList,KeyboardAvoidingView,StatusBar,ScrollView} from 'react-native';
import{Container,Header,Content,DeckSwiper,Card,CardItem,Thumbnail,Button,Label,Icon,Left,Body,Right,Grid,Col,Row,Input,Item,Spinner} from 'native-base';
import{LinearGradient,ImagePicker} from 'expo';
import{profileUpdateStart,profileUpdateSuccess,profileUpdateFailed,userFetchStart,userFetchSuccess,userFetchFailed} from '../actions/Profilo.js';
import{eventFetchStart,eventFetchSuccess,eventFetchFailed} from '../actions/EventoActions.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as firebase from 'firebase';

class Home extends Component{
 //state={nome:this.props.FetchProfilo.nome,cognome:this.props.FetchProfilo.cognome,età:this.props.FetchProfilo.età,città:this.props.FetchProfilo.città,gamertag:this.props.FetchProfilo.gamertag,psn:this.props.FetchProfilo.psn,steam:this.props.FetchProfilo.steam}
 //state={nome:"Nome",cognome:"Cognome",età:"Età",città:"Città",gamertag:"Gamertag",psn:"Psn",steam:"Steam"}
 state={nome:this.UserNome(),cognome:this.UserCognome(),età:this.UserEtà(),gamertag:this.UserGamertag(),psn:this.UserPsn(),steam:this.UserSteam()}
  async componentDidMount(){

    this.props.actions.eventFetchStart();
    firebase.database().ref(`/evento`).once('value').
    then((snapshot)=>{this.props.actions.eventFetchSuccess(snapshot.val()),console.log("PROVAAAA"+snapshot.val())}).
    catch(error=>this.props.actions.eventFetchFailed(error));
  }

  Partecipa(indice,posti,utente,partecipanti,piattaforma){


     if(posti==0){
      alert("Al momento non sono disponibili posti per partecipare");
    }
    else{
      var nuovo;
      if(piattaforma=="Xbox One")
        nuovo=this.props.FetchProfilo.gamertag;
      else if (piattaforma=="PC")
        nuovo=this.props.FetchProfilo.steam;
      else nuovo=this.props.FetchProfilo.psn;
      const{currentUser}=firebase.auth();
      firebase.database().ref(`/evento-users/${currentUser.uid}/${indice}`).once('value').
      then(function(snapshot){
         var id=snapshot.val().idevento;
        console.log("EVENTOOOOO" + id);
        alert("Ti sei già prenotata per questo evento");
      })
      .catch(function(error){
          var id='NULL';
        console.log("EVENTOOOOOOOOO"+ id);
        posti=posti-1;
        partecipanti=partecipanti+" "+nuovo;
        console.log(posti);
         firebase.database().ref().child(`/evento/${indice}`).update({posti:posti,partecipanti:partecipanti});
         firebase.database().ref(`/evento-users/${currentUser.uid}/${indice}`).set({uid:currentUser.uid,idevento:indice});
         alert("Ti sei riservato un posto");

      });
       this.props.navigate('Home');


    }
  }

  Disdici(indice,posti,utente,partecipanti,piattaforma){

      var nuovo;
      if(piattaforma="Xbox One")
        nuovo=this.props.FetchProfilo.gamertag;
      else if(piattaforma="PC")
        nuovo=this.props.FetchProfilo.steam;
      else nuovo=this.props.FetchProfilo.psn;
      partecipanti=partecipanti.replace(nuovo,"")
      console.log("PROVAAAA"+partecipanti);
      const{currentUser}=firebase.auth();
      firebase.database().ref(`/evento-users/${currentUser.uid}/${indice}`).once('value').
      then(function(snapshot){
        posti=posti+1;
        if(snapshot.val().uid==currentUser.uid){
        firebase.database().ref().child(`/evento/${indice}`).update({posti:posti,partecipanti:partecipanti});
        firebase.database().ref().child(`/evento-users/${currentUser.uid}/${indice}`).remove();
        alert("Hai annullato la tua partecipazione alla partita");
      }
      else{
        alert("Non puoi disdire una partita a cui non partecipi");
      }
      })
      .catch(function(error){
        alert("Non puoi disdire una partita a cui non partecipi");
      });
      this.props.navigate('Home');

  }

  loadSpinner(){
    if(this.props.ProfileLoading){
      return(
        <Spinner color='black' />
      );
    }

  }



  ViewResults(){
    const{currentUser}=firebase.auth();
    this.props.actions.userFetchStart();
    firebase.database().ref(`/users`).once('value').then((snapshot)=>{
      var items;
      snapshot.forEach((child)=>{
        if(currentUser.uid==child.key){
          items.child.val();
        }

      });
      this.props.actions.userFetchSuccess(items)
    }).
    catch(error=>this.props.actions.userFetchFailed(error));
  }

  UpdateProfile(){
    this.props.actions.profileUpdateStart();
    const{currentUser}=firebase.auth();
    var user={"nome":this.state.nome,"cognome":this.state.cognome,"età":this.state.età,"città":this.state.città,"email":this.props.FetchProfilo.email,"gamertag":this.state.gamertag,"psn":this.state.psn,"steam":this.state.steam};
    console.log(user.nome);
    console.log(user.email);
    firebase.database().ref(`/users/${currentUser.uid}`)
    .set({nome:user.nome,cognome:user.cognome,età:user.età,città:user.città,email:user.email,gamertag:user.gamertag,psn:user.psn,steam:user.steam})
    .then(()=>{
      this.props.actions.profileUpdateSuccess(),
      this.ViewResults(),alert("Modifica completata")
    })
    .catch(error=>{this.props.actions.profileUpdateFailed(error)});

  }

  UserNome(){
    var nome="Nome";
    if(this.props.FetchProfilo!=null && this.props.FetchProfilo.nome!="Nome")
      return this.props.FetchProfilo.nome;
    else return nome;

  }

  UserEtà(){
    var età="Età";
    if(this.props.FetchProfilo!=null && this.props.FetchProfilo.età!="Età")
      return this.props.FetchProfilo.età;
    else return età;
  }

  UserCognome(){
    var cognome="Cognome";
    if(this.props.FetchProfilo!=null && this.props.FetchProfilo.cognome!="Cognome")
      return this.props.FetchProfilo.cognome;
    else return cognome;
  }
  UserCittà(){
    var città="Città";
    if(this.props.FetchProfilo!=null && this.props.FetchProfilo.città!="Città")
      return this.props.FetchProfilo.città;
    else return città;
  }


  UserGamertag(){
    var gamertag="Gamertag";
    if(this.props.FetchProfilo!=null && this.props.FetchProfilo.gamertag!="Gamertag")
      return this.props.FetchProfilo.gamertag;
    else return gamertag;
  }
  UserPsn(){
    var psn="Psn";
    if(this.props.FetchProfilo!=null && this.props.FetchProfilo.psn!="Psn")
      return this.props.FetchProfilo.psn;
    else return psn;
  }
  UserSteam(){
    var steam="Steam";
    if(this.props.FetchProfilo!=null && this.props.FetchProfilo.steam!="Steam")
      return this.props.FetchProfilo.steam;
    else return steam;
  }

  stampa(item){
    const{currentUser}=firebase.auth();
    if(item.uid==currentUser.uid){
      return(
        <TouchableOpacity activeOpacity={0.6} >
          <Card style={{alignSelf:'center',width:'98%',borderRadius:5}}>
          <Item>
            <Text style={styles.dato}> Evento creato da: {item.utente}</Text>
          </Item>
          <Item>
            <Text style={styles.dato}> Piattaforma di gioco: {item.piattaforma}</Text>
          </Item>
          <Item>
            <Text style={styles.dato}> Gioco: {item.gioco}</Text>
          </Item>
          <Item>
            <Text style={styles.dato}> Posti rimanenti: {item.posti}</Text>
          </Item>
          <Item>
            <Text style={styles.dato}> Data: {item.data} Ora: {item.ora}</Text>
          </Item>
          <Item>
            <Text style={styles.dato}> Partecipanti: {item.partecipanti}</Text>
          </Item>
          </Card>
        </TouchableOpacity>
        );
      }
      else{
        return(
          <TouchableOpacity activeOpacity={0.6} >
            <Card style={{alignSelf:'center',width:'98%',borderRadius:5}}>
            <Item>
              <Text style={styles.dato}> Evento creato da: {item.utente}</Text>
            </Item>
            <Item>
              <Text style={styles.dato}> Piattaforma di gioco: {item.piattaforma}</Text>
            </Item>
            <Item>
              <Text style={styles.dato}> Gioco: {item.gioco}</Text>
            </Item>
            <Item>
              <Text style={styles.dato}> Posti rimanenti: {item.posti}</Text>
            </Item>
            <Item>
              <Text style={styles.dato}> Data: {item.data} Ora: {item.ora}</Text>
            </Item>
            <Item>
              <Text style={styles.dato}> Partecipanti: {item.partecipanti}</Text>
            </Item>
            <Row>
              <Col>
                <Button style={{backgroundColor:'orange', width:'100%',alignSelf:'center',display:'flex',flexDirection:'row',justifyContent:'center'}} onPress={()=>this.Partecipa(item.id,item.posti,item.uid,item.partecipanti,item.piattaforma)}>
                  <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:'grey'}}> PARTECIPA</Text>
                </Button>
              </Col>
              <Col>
                <Button style={{backgroundColor:'orange',width:'100%',alignSelf:'center',display:'flex',flexDirection:'row',justifyContent:'center'}} onPress={()=>this.Disdici(item.id,item.posti,item.uid,item.partecipanti,item.piattaforma)}>
                  <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:'grey'}}> DISDICI</Text>
                </Button>
              </Col>
            </Row>
            </Card>
          </TouchableOpacity>
        );
      }
    }




  render(){
    const navigate=this.props.navigate;
    console.log(this.state.nome);
 //if(this.props.FetchProfilo.nome=="Nome"){
//if(this.state.nome=="Nome"){
if(this.UserNome()=="Nome"){
    return(

      <Container>
        <StatusBar hidden={true}/>
        <KeyboardAvoidingView behavior='position'>
          <LinearGradient colors={['#db860f','#db380f']} style={{height:'100%',width:'100%'}}>
          {/*  <Row size={25} style={{justifyContent:'center',alignItems:'center',top:20}}>
              <Col style={{justifyContent:'center',alignItems:'center'}}>
                <Col style={{justifyContent:'space-around',alignItems:'center'}}>
                  <Row style={{justifyContent:'space-around',alignItems:'center',width:80,height:50}}>
                  </Row>
                </Col>
              </Col>
            </Row>*/}
            <Row size={75} style={{bottom:70}}>
              <Col style={{justifyContent:'center'}}>
                <Item>
                  <Label style={{color:'white'}}>Nome: </Label>
                  <Input maxLength={21} placeholder={this.UserNome()} onChangeText={(nome)=>this.setState({nome})} placeholderTextColor='black' />
                </Item>
                <Item style={{top:5}}>
                  <Label style={{color:'white'}}>Cognome: </Label>
                  <Input maxLength={21} placeholder={this.UserCognome()} onChangeText={(cognome)=>this.setState({cognome})} placeholderTextColor='black'/>
                </Item>
                <Item style={{top:5}}>
                  <Label style={{color:'white'}}>Età: </Label>
                  <Input maxLength={2} keyboardType="numeric" placeholder={this.UserEtà()} onChangeText={(età)=>this.setState({età})} placeholderTextColor='black'/>
                </Item>
                <Item style={{top:5}}>
                  <Label style={{color:'white'}}>Città: </Label>
                  <Input maxLength={21} placeholder={this.UserCittà()} onChangeText={(città)=>this.setState({città})} placeholderTextColor='black'/>
                </Item>
                <Item style={{top:5}}>
                  <Icon name="logo-xbox" style={{color:'white'}}/>
                  <Label style={{color:'white'}}>Gamertag: </Label>
                  <Input maxLength={21} placeholder={this.UserGamertag()} onChangeText={(gamertag)=>this.setState({gamertag})} placeholderTextColor='black' />
                </Item>
                <Item style={{top:5}}>
                  <Icon name="logo-playstation" style={{color:'white'}}/>
                  <Label style={{color:'white'}}>PsnID: </Label>
                  <Input maxLength={21} placeholder={this.UserPsn()} onChangeText={(psn)=>this.setState({psn})} placeholderTextColor='black' />
                </Item>
                <Item style={{top:5}}>
                  <Icon name="logo-steam" style={{color:'white'}}/>
                  <Label style={{color:'white'}}>SteamID: </Label>
                  <Input maxLength={21} placeholder={this.UserSteam()} onChangeText={(steam)=>this.setState({steam})} placeholderTextColor='black' />
                </Item>
              </Col>
            </Row>
            <Button style={{backgroundColor:'orange',alignSelf:'center',width:'80%',display:'flex',flexDirection:'row',justifyContent:'center',bottom:30}} onPress={()=>this.UpdateProfile()}>
              <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:'grey'}}> MODIFICA </Text>
            </Button>
          </LinearGradient>
        </KeyboardAvoidingView>
      </Container>

    );
  }
  else{
    return(

      <Container>
        <StatusBar hidden={true}/>
        <LinearGradient colors={['#db860f','#db380f']} style={{height:'100%',width:'100%'}}>
          <ScrollView>
            <FlatList
              inverted
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
  dato:{
    marginTop:5,
    fontSize:14,
    fontWeight:'bold',
    textAlign:'center',
    color:'black',
    backgroundColor:'transparent'
  }

});

export default connect(mapStateToProps,mapDispatchToProps)(Home);
