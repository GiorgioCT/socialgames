import React,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,KeyboardAvoidingView,AppRegistry,Image,TouchableWithoutFeedback,FlatList,TouchableOpacity,Platform} from 'react-native';
import{Container,Header,Content,Form,Item,Input,Buttom,Label,Body,Title,Icon,Left,Spinner,Right,Card,CardItem,Thumbnail,DeckSwiper} from 'native-base';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import {connect} from 'react-redux';
import Gruppi from '../containers/Gruppi';
import{Drawer} from 'native-base';
import{NavigationActions} from 'react-navigation';
import Sidebar from '../containers/sidebar';
export default class MieiGruppi extends Component{
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
      actions:[NavigationActions.navigate({routeName:'login'})]
    });
    this.props.navigation.dispatch(resetAction);
  }

  render(){
    const {navigate,goBack}=this.props.navigation;
    if(Platform.OS==='ios'){
      return(
        <Container style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
          <AppHeader/>
          <Gruppi navigate={navigate}/>
          <AppFooter navigate={navigate} goBack={goBack}/>
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
            <AppHeader openDrawer={()=>this.openDrawer()}/>
            <Gruppi navigate={navigate}/>
          </Drawer>
        </Container>
      );
    }
  }
}
