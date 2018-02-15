import React,{Component} from 'react';
import{AppRegistry,Text,Image,StyleSheet,TouchableWithoutFeedback,FlatList,TouchableOpacity,Dimensions,View,Platform} from 'react-native';
import {Container,Header,Content,DeckSwiper,Card,CardItem,Thumbnail,Button,Icon,Left,Body,Right,Row} from 'native-base';
import AppHeader from '../components/AppHeader.js';
import Home from '../containers/Home.js';
import AppFooter from '../components/AppFooter.js';
import {NavigationActions} from 'react-navigation';
import Sidebar from '../containers/sidebar.js';
import {Drawer} from 'native-base';
export default class HomeScreen extends Component{
  constructor(props){
    super(props);
    console.ignoredYellowBox=['Setting a timer'];
  }
  static navigationOptions={
    header:null
  };

  state={
    flag:false
  };
  closeDrawer=()=>{
    this.drawer._root.close();
      this.setState({flag:false});
  };

  openDrawer=()=>{
    this.drawer._root.open();
    this.setState({flag:true});
  };

  func=()=>{
    const resetAction=NavigationActions.reset({
      index:0,
      actions:[
        NavigationActions.navigate({routeName:'login'})
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }
  render(){
    const{navigate,goBack}=this.props.navigation;
    if(Platform.OS==='ios'){
      return(
        <Container style= {{ width: Dimensions.get('window').width , height: Dimensions.get('window').height}}>
          <AppHeader/>
          <Home navigate={navigate} />
          <AppFooter  navigate={navigate} goBack= {goBack} />
        </Container>
      );
    }
    else{
      return(
        <Container style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
          <Drawer
            ref={(ref)=>{this.drawer=ref;}}
            content={<Sidebar navigate={navigate} reset={()=>this.func()}/>}
          >
            <AppHeader openDrawer={()=>this.openDrawer()} />
            <Home navigate={navigate} />
          </Drawer>
        </Container>
      );
    }
  }
}
