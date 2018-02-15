import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,KeyboardAvoidingView,StatusBar} from 'react-native';
import {Container,Header,Content,Form,Item,Input,Button,Label} from 'native-base';
import {connect} from 'react-redux';
import{Col,Row,Grid} from 'react-native-easy-grid';
import {LinearGradient} from 'expo';
import{forgetPassword} from '../actions/PswDimenticata';

class FormPswDimenticata extends Component{
  constructor(props){
    super(props);
    state={
      email:''
    }
  }

  static navigationOptions={
    header:null
  };

  render(){
    return(
    <Container>
        <StatusBar hidden={true}/>
        <Content style={{flex:1}} contentContainerStyle={{flex:1}}>
          <LinearGradient colors={['#db860f','#db380f']} style={{height:'100%'}}>
            <Row style={{flex:0.3}}/>
            <Col style={{flex:1,justifyContent:'flex-end',alignItems:'center'}}>
              <Text style={{fontWeight:'bold',fontSize:20,color:'white'}}> Password dimenticata? </Text>
              <Text style={{fontSize:12,color:'white'}}> Inserisci la tua email per il recupero </Text>
            </Col>
            <Row style={{flex:2,justifyContent:'center',top:20}}>
              <Form style={styles.form}>
                <Item floatingLabel style={{width:'90%'}}>
                  <Label style={{color:'#E5F8FF'}}> Email </Label>
                  <Input keyboardType='email-address' onChangeText={(email)=>this.setState({email})} />
                </Item>
              </Form>
            </Row>
            <Row style={{flex:1,justifyContent:'center'}}>
              <Button style={styles.button}
                onPress={()=>this.props.forgetPassword({
                  email:this.state.email,
                  navigateTo:(screen)=>this.props.navigation.navigate(screen)

                })}
              >
                <Text style={styles.textToSubmit}>Invia Email</Text>
              </Button>
            </Row>
          </LinearGradient>
        </Content>
      </Container>

    )
  }
}

const styles=StyleSheet.create({
  form:{
    top:20,
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center'
  },


  button:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    width:'80%',
    backgroundColor:'orange'
  },

  /*text:{
    fontWeight:'bold',
    textAlign:'right',
    color:'black'
  },*/

  textToSubmit:{
    fontWeight:'bold',
    fontSize:19,
    alignSelf:'center',
    color:'grey'
  },
  input:{
    marginLeft:10,
    color:'#E5F8FF'
  }

});
export default connect(null,{forgetPassword}) (FormPswDimenticata);
