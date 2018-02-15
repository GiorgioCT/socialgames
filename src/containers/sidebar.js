import React,{Component} from 'react';
import {Image,StyleSheet,View} from 'react-native';
import {Constants} from 'expo';
import{Content,Container,Icon,Right,Header,Card,Title,Text,CardItem,Body,Thumbnail,Button,Row,Col} from 'native-base';
import{loginUser} from '../actions/AuthActions';
import{connect} from 'react-redux';
import{AsyncStorage} from 'react-native';
import{logoutUserStart, logoutUserFailed, logoutUserSuccess} from '../actions/Logout';
import * as firebase from 'firebase';
import {bindActionCreators} from 'redux';
import{userFetchStart,userFetchFailed,userFetchSuccess} from '../actions/Profilo';
class Sidebar extends Component{
  async componentDidMount(){
    console.log("UID LOG did mount",this.props.uid);
    this.props.actions.userFetchStart();
    firebase.database().ref(`/users`).once('value').
    then((snapshot)=>{
      var items;
      snapshot.forEach((child)=>{
        if(this.props.uid==child.key){
          items=child.val();
        }
      });
      this.props.actions.userFetchSuccess(items)
    }).
    catch(error=>this.props.actions.userFetchFailed(error));
  }

  UserNome(){
    if(this.props.user!=null && (this.props.user.nome!="" && this.props.user.nome!="Nome"))
      return this.props.user.nome;
    else if(this.props.user!=null) return this.props.user.email;
  }



  Logout(){
    AsyncStorage.clear();
    this.props.actions.logoutUserStart();
    firebase.auth().signOut().
      then(()=>this.props.actions.logoutUserSuccess({logout:()=>this.props.reset()})
      ).
      catch((error)=>this.props.actions.logoutUserFailed(error));
  }

  render(){
    const navigate=this.props.navigate;
    return(
      <View style={{flex:1,width:'100%',flexDirection:'column',justifyContent:'space-around',alignItems:'center',backgroundColor:'white'}}>
        <View style={{flex:1,width:'100%',flexDirection:'column',justifyContent:'space-around',alignItems:'center',backgroundColor:'orange'}}>

          <Text style={styles.Username}>Bentornato {this.UserNome()} </Text>
        </View>

        <CardItem button style={{flex:1,flexDirection:'row',backgroundColor:'transparent'}} onPress={()=>navigate('Home')}>
          <Icon name="home"/>
          <Text> Home </Text>
          <Right>
            <Icon name="ios-arrow-forward-outline"/>
          </Right>
        </CardItem>

        <CardItem button style={{flex:1,flexDirection:'row',backgroundColor:'transparent'}} onPress={()=>navigate('Evento')}>
          <Icon name="ios-game-controller-b"/>
          <Text> Crea gruppo gioco </Text>
          <Right>
            <Icon name="ios-arrow-forward-outline"/>
          </Right>
        </CardItem>

        <CardItem button style={{flex:1,flexDirection:'row',backgroundColor:'transparent'}} onPress={()=>navigate('MieiGruppi')}>
          <Icon name="ios-people"/>
          <Text> Gruppi creati </Text>
          <Right>
            <Icon name="ios-arrow-forward-outline"/>
          </Right>
        </CardItem>

        <CardItem button style={{flex:1,flexDirection:'row',backgroundColor:'transparent'}} onPress={()=>navigate('MioProfilo')}>
          <Icon name="person"/>
          <Text> Mio profilo </Text>
          <Right>
            <Icon name="ios-arrow-forward-outline"/>
          </Right>
        </CardItem>

        <CardItem button style={{flex:1,flexDirection:'row',backgroundColor:'transparent'}} onPress={()=>this.Logout()}>
          <Icon name="md-exit"/>
          <Text> Logout </Text>
          <Right>
            <Icon name="ios-arrow-forward-outline"/>
          </Right>
        </CardItem>
      </View>
    );
  }

}

const styles=StyleSheet.create({
  Username:{
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
    color:'grey',
    backgroundColor:'transparent'
  }

});

const mapStateToProps=state=>({
  uid:state.auth.uid,
  user:state.FetchProfilo.profile
});

function mapDispatchToProps(dispatch){
  return{
    actions:{
      userFetchStart:bindActionCreators(userFetchStart,dispatch),
      userFetchSuccess:bindActionCreators(userFetchSuccess,dispatch),
      userFetchFailed:bindActionCreators(userFetchFailed,dispatch),
      logoutUserStart:bindActionCreators(logoutUserStart,dispatch),
      logoutUserSuccess:bindActionCreators(logoutUserSuccess,dispatch),
      logoutUserFailed:bindActionCreators(logoutUserFailed,dispatch)
    }
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);
