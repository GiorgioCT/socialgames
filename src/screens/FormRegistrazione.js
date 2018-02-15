import React,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,KeyboardAvoidingView,StatusBar}from 'react-native';
import {Container,Header,Content,Form,Item,Input,Button,Label,Body,Title,Icon,Left,Spinner,Right,Card,CardItem,Thumbnail} from 'native-base';
import{RegistrazioneUtente} from '../actions/Registrazione';
import{loginUser} from '../actions/AuthActions';
import {connect} from 'react-redux';
import{LinearGradient} from 'expo';
import {Col,Row,Grid}from 'react-native-easy-grid';
class FormRegistrazione extends Component{
  constructor(props){
    super(props)
    this.state={email:'',password:''};
  }
  static navigationOptions={
    header:null
  };

  loadSpinner(){
    if(!this.props.isLoading){
      return(<Spinner color='black' />);
    }
    else{
      return(<Text style={styles.textToSubmit}> CREA UN ACCOUNT </Text>);

    }
  }

  render(){
    const{navigate}=this.props.navigation;
    return(
      <Container>
        <StatusBar hidden={true}/>
        <Content style={{flex:2}} contentContainerStyle={{flex:2}}>
          <LinearGradient colors={['#db860f','#db380f']} style={{height:'100%'}}>
          <Row style={styles.rowone}/>
          <Col style={{flex:2,justifyContent:'flex-start',alignItems:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:25,color:'white'}}> Registrati! </Text>
            <Text style={{fontSize:17,color:'white'}}> Inserisci la tua email e una password </Text>
          </Col>
          <Col style={styles.coltwo}>
            <Form>
              <Item floatingLabel style={styles.form}>
                <Label style={{color:'#E5F8FF'}}> Email </Label>
                <Input style={styles.input} keyboardType='email-address' onChangeText={(email)=>this.setState({email})}/>
              </Item>
              <Item floatingLabel style={styles.form}>
                <Label style={{color:'#E5F8FF'}}> Password </Label>
                <Input style={styles.input} secureTextEntry={true} onChangeText={(password)=>this.setState({password})}/>
              </Item>
            </Form>
          </Col>
          <Row style={styles.rowthree}>
            <Button
              style={styles.buttonToSubmit}
              onPress={()=>this.props.RegistrazioneUtente({
                email:this.state.email,
                password:this.state.password
              })}

            >
            {this.loadSpinner()}
            </Button>
          </Row>

        </LinearGradient>
      </Content>
    </Container>
    )
  }
}

const mapStateToProps=state=>({
  isLoading:state.registrazione.loading,
  error:state.registrazione.error
})

const styles=StyleSheet.create({
  rowone:{
    flex:1,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-end'
  },

  coltwo:{
    flex:2,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center'

  },

  rowthree:{
    flex:1,
    display:'flex',
    marginLeft:10,
    marginRight:10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },

  form:{
    bottom:150,
    width:'80%',
    alignSelf:'center',
    marginLeft:10,
    marginRight:10,

  },

  input:{
    marginLeft:10,
    color:'#E5F8FF'
  },

  text:{
    color:'#E5F8FF'
  },

  textToSubmit:{
    fontWeight:'bold',
    fontSize:19,
    alignSelf:'center',
    color:'grey'
  },

  buttonToSubmit:{
    justifyContent:'center',
    backgroundColor:'orange',
    width:'80%'
  }
/*  lastRow:{
    flex:0.2,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  createAndForgot:{
    alignSelf:'flex-start',
    fontSize:20,
    color:'white'
  }*/
});
export default connect(mapStateToProps,{RegistrazioneUtente,loginUser})(FormRegistrazione);
