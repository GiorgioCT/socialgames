import Expo from 'expo';
import React from 'react';
import {StyleSheet,Text,View,StatusBar,Platform,ScrollView,AsyncStorage,AppState} from 'react-native';
import appReducer from './src/reducers';
import{Provider} from 'react-redux';
import{createStore, applyMiddleware} from 'redux';
import {logger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import * as firebase from 'firebase';
import {StackNavigator,TabNavigator} from 'react-navigation';
import LoginForm from './src/screens/LoginForm';
import FormRegistrazione from './src/screens/FormRegistrazione';
import FormPswDimenticata from './src/screens/FormPswDimenticata';
import Profilo from './src/screens/Profilo';
import HomeScreen from './src/screens/HomeScreen';
import Evento from './src/screens/Evento';
import MieiGruppi from './src/screens/MieiGruppi'
const initialState={};
let store=createStore(appReducer,applyMiddleware(logger,ReduxThunk));
class App extends React.Component{
  constructor(){
    super();
    this.state={isReady:false, isStoreLoading:false, store:store};
  }
  async componentWillMount(){
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium:require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({isReady:true});
    var config={
        apiKey:"AIzaSyBQASN1kqVESso1AWJg_tvxeqUJVsHcTDY",
        authDomain:"socialgames-52cb7.firebaseapp.com",
        databaseURL:"https://socialgames-52cb7.firebaseio.com",
        projectID:"socialgames-52cb7",
        storageBucket:"socialgames-52cb7.appspot.com",
        messagingSenderId:"618237393333"
    };
    firebase.initializeApp(config);
    var self=this;
    AppState.addEventListener('change',this._handleAppStateChange.bind(this));
    this.setState({isStoreLoading:true});
    AsyncStorage.getItem('completeStore').then((value)=>{
      if(value && value.length){
        let initialStore=JSON.parse(value);
        self.setState({store:createStore(appReducer,initialStore,applyMiddleware(logger,ReduxThunk))});

      }
      else{
        self.setState({store:store});
      }
      self.setState({isStoreLoading:false});
    }).catch((error)=>{
      self.setState({store:store});
      self.setState({isStoreLoading:false});
    })
  }

  componentWillUnmount(){
    AppState.removeEventListener('change',this._handleAppStateChange.bind(this));

  }
  _handleAppStateChange(currentAppState){
    let storingValue=JSON.stringify(this.state.store.getState())
    AsyncStorage.setItem('completeStore',storingValue);
  }
  render(){
    if(!this.state.isReady){
      return <Expo.AppLoading/>;
    }

    const MainNavigator=StackNavigator({
      login:{screen:LoginForm},
      registrazione:{screen:FormRegistrazione},
      pswdimenticata:{screen:FormPswDimenticata},
      MioProfilo:{screen:Profilo},
      Home:{screen:HomeScreen},
      Evento:{screen:Evento},
      MieiGruppi:{screen:MieiGruppi},
    });

    const LoginNavigator=StackNavigator({
      login:{screen:LoginForm},
      registrazione:{screen:FormRegistrazione},
      pswdimenticata:{screen:FormPswDimenticata},
      MioProfilo:{screen:Profilo},
      Home:{screen:HomeScreen},
      Evento:{screen:Evento},
      MieiGruppi:{screen:MieiGruppi},
    });

    if(this.state.isStoreLoading==true){
      return <Text>Caricamento</Text>
    }
    else{
      console.log("STORE",this.state.store);
      console.log("STORE TUTO",this.state.store.getState());
      console.log('VERO O FALSO', this.state.store.getState().auth.isLogged);
     if(this.state.store.getState().auth.isLogged){
        return(
          <Provider store={this.state.store}>
            <View style={{flex:1}}>
              <MainNavigator/>
            </View>
          </Provider>
        );
      }
      else{
        return(
          <Provider store={this.state.store}>
            <View style={{flex:1}}>
              <LoginNavigator/>
            </View>
          </Provider>
        );
      }
    }
  }
}
export default App;
