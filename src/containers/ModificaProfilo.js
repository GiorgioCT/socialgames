import React,{Component} from 'react';
import{AppRegistry,Text,Image,View,StyleSheet,TouchableOpacity,TouchableWithoutFeedback,FlatList,KeyboardAvoidingView,ScrollView,StatusBar} from 'react-native';
import{Container,Header,Content,DeckSwiper,Card,CardItem,Thumbnail,Button,Label,Icon,Left,Body,Right,Grid,Col,Row,Input,Item,Spinner} from 'native-base';
import{LinearGradient,ImagePicker} from 'expo';
import{profileUpdateStart,profileUpdateSuccess,profileUpdateFailed,userFetchStart,userFetchSuccess,userFetchFailed} from '../actions/Profilo.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as firebase from 'firebase';


class ModificaProfilo extends Component{
  state={nome:this.props.FetchProfilo.nome,cognome:this.props.FetchProfilo.cognome,età:this.props.FetchProfilo.età,città:this.props.FetchProfilo.città,gamertag:this.props.FetchProfilo.gamertag,psn:this.props.FetchProfilo.psn,steam:this.props.FetchProfilo.steam}

  loadSpinner(){
    if(this.props.ProfileLoading){
      return(
        <Spinner color='black' />
      );
    }

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
      alert("Modifica completata")
    })
    .catch(error=>{this.props.actions.profileUpdateFailed(error)});
    this.props.navigate('ModificaProfilo')



  }

  UserNome(){
    if(this.props.FetchProfilo!=null && this.props.FetchProfilo.nome!="Nome")
      return this.props.FetchProfilo.nome;

  }

  UserEtà(){
    if(this.props.FetchProfilo!=null && this.props.FetchProfilo.età!="Età")
      return this.props.FetchProfilo.età;
  }

  UserCognome(){
    if(this.props.FetchProfilo!=null && this.props.FetchProfilo.cognome!="Cognome")
      return this.props.FetchProfilo.cognome;
  }
  UserCittà(){
    if(this.props.FetchProfilo!=null && this.props.FetchProfilo.città!="Città")
      return this.props.FetchProfilo.città;
  }


  UserGamertag(){
    if(this.props.FetchProfilo!=null && this.props.FetchProfilo.gamertag!="Gamertag")
      return this.props.FetchProfilo.gamertag;
  }
  UserPsn(){
    if(this.props.FetchProfilo!=null && this.props.FetchProfilo.psn!="Psn")
      return this.props.FetchProfilo.psn;
  }
  UserSteam(){
    if(this.props.FetchProfilo!=null && this.props.FetchProfilo.steam!="Steam")
      return this.props.FetchProfilo.steam;
  }

  render(){
    const navigate=this.props.navigate;
    //if(this.UserNome()=="Giorgio"){
    return(
      <Container>
        <StatusBar hidden={true}/>
        <KeyboardAvoidingView behavior='position'>
          <LinearGradient colors={['#db860f','#db380f']} style={{height:'100%',width:'100%'}}>

            {/*}<Row size={25} style={{justifyContent:'center',alignItems:'center',top:20}}>
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
              <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:'grey'}}>Modifica</Text>
            </Button>

          </LinearGradient>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

function mapStateToProps(state){
  return{
    uid:state.auth.uid,
    userAuth:state.auth.user,
    FetchProfilo:state.FetchProfilo.profile,
    ProfileLoading:state.FetchProfilo.loading
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
      userFetchSuccess:bindActionCreators(userFetchSuccess,dispatch)
    }
  };
}





export default connect(mapStateToProps,mapDispatchToProps)(ModificaProfilo);
