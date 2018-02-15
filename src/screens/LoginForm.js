import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,Dimensions,KeyboardAvoidingView,StatusBar} from 'react-native';
import {Container,Header,Content,Form,Item,Input,Button,Label,Body,Title,Icon,Left,Right,Card,CardItem,Thumbnail,Spinner} from 'native-base';
import{loginUser} from '../actions/AuthActions';
import {connect} from 'react-redux';
import {Col,Row,Grid} from 'react-native-easy-grid';
import{LinearGradient} from 'expo';
class LoginForm extends Component{
  static navigationOptions={
    header:null
  }
  constructor(props){
    super(props)
    this.state={
      email:"prova@gmail.com",
      password:"123456"
    }
  }
  loadSpinner(){
   if(!this.props.isLoading){
     return(
        <Spinner color='black'/>
      );
   }
   else{
      return(<Text style={styles.textToSubmit}> ACCEDI </Text>);
    }
  }
  render(){
    const{navigate}=this.props.navigation;
    return(
      <Container>
        <StatusBar hidden={true}/>
        <Content style={{flex:2}} contentContainerStyle={{flex:2}}>
          <LinearGradient colors={['#db860f','#db380f']} style={{height:'100%'}}>
            <Row style={styles.firstRow}>
              <Text style={{color:'white',fontSize:40,fontWeight:'bold'}}> SOCIALGAMES</Text>
            </Row>
            <Col style={styles.secondColumn}>
              <Form style={{right:5,bottom:40}}>
                <Item floatingLabel style={{width:'80%'}}>
                  <Label style={{marginLeft:10,color:'white'}}> Email </Label>
                  <Icon name="ios-person-outline" style={{color:'white'}}/>
                  <Input keyboardType='email-address' onChangeText={(email)=>this.setState({email})} style={{color:'white'}}/>
                </Item>
                <Item floatingLabel style={{width:'80%'}}>
                  <Label style={{marginLeft:10,color:'white'}}> Password </Label>
                  <Icon name="ios-key-outline" style={{color:'white'}}/>
                  <Input style={{color:'white'}} secureTextEntry={true} onChangeText={(password)=>this.setState({password})}/>
                </Item>
              </Form>
            </Col>
            <Row style={styles.thirdRow}>
              <Button
                style={styles.buttonLogin}
                onPress={()=>
                  this.props.loginUser({
                  email:this.state.email,
                  password:this.state.password,
                  navigateTo:(screen)=>this.props.navigation.navigate(screen),
                  navigation:this.props.navigation
                })}
              >
              {this.loadSpinner()}
              </Button>
            </Row>
            <Row style={styles.lastRow}>
              <Text style={styles.createAndForgot} onPress={()=>navigate('registrazione')}> Registrati </Text>
              <Text style={styles.createAndForgot} onPress={()=>navigate('pswdimenticata')}> Hai dimenticato la password?</Text>
            </Row>
          </LinearGradient>
        </Content>
      </Container>

    )
  }

}

const mapStateToProps=state=>({
  isLoading:state.auth.loading,
  error:state.auth.error,
  user:state.auth.user
})

const styles=StyleSheet.create({
  buttonLogin:{
    alignSelf:'center',
    width:'80%',
    backgroundColor:'orange',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
  },
  firstRow:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-start',
    top:40
  },
  thirdRow:{
    flex:0.6,
    justifyContent:'center',
    alignItems:'flex-end'
  },
  secondColumn:{
    justifyContent:'center',
    flex:2,
    alignItems:'center'
  },
  /*buttonSignUp:{
    alignSelf:'center',
    width:'40%',
   backgroundColor:'#FF8C00',

    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    marginLeft:10
  },*/
  lastRow:{
    flex:0.2,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  createAndForgot:{
    alignSelf:'flex-start',
    fontSize:15,
    color:'white'
  },
  textToSubmit:{
    fontWeight:'bold',
    fontSize:19,
    alignSelf:'center',
    color:'grey'
  }
});

export default connect(mapStateToProps,{loginUser}) (LoginForm);
