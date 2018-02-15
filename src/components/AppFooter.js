import React,{Component} from 'react';
import {Container,Header,Content,Footer,FooterTab,Button,Icon,Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {NavigationActions} from 'react-navigation';
export default class AppFooter extends Component{
  constructor(){
    super();
    console.ignoredYellowBox=['Setting a timer'];
  }

  render(){
    const navigate=this.props.navigate;
    const goBack=this.props.goBack;
    return(
      <Footer style={styles.wrapper}>
        <FooterTab>
          <Button vertical onPress={()=>goBack()}>
            <Icon name="md-arrow-round-back" style={styles.icons}/>
            <Text style={styles.text}>Indietro</Text>
          </Button>
          <Button vertical onPress={()=>navigate('MioProfilo')}>
            <Icon name="ios-person" style={styles.icons}/>
            <Text style={styles.text}>Home</Text>
          </Button>
        </FooterTab>
      </Footer>


    );
  }
}

const styles=StyleSheet.create({
  wrapper:{
    height:45,
    backgroundColor:'darkblue',
    justifyContent:'center',
    alignItems:'center',
    shadowOffset:{height:2},
    shadowColor:'black',
    shadowOpacity:0.2
  },
  text:{
    fontSize:9,
    color:'white'
  },
  icons:{
    fontSize:23,
    color:'white'
  }
});
