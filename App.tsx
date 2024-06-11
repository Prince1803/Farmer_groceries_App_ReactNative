import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import React, { useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Src/Components/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './Src/Components/Auth/SplashScreen';
import Login from './Src/Components/Auth/Login';
import Signup from './Src/Components/Auth/SignUp';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { TabNav } from './Src/Assets/Constants/BottomTab';
import { AuthStack } from './Src/Components/Navigation';
import Toast from 'react-native-toast-message';
import DrawerScreen from './Src/Components/DrawerPractice';



const App = () => {
  const Authentication = true;
  const [splash, setSplash] = useState(true);
  setTimeout(() => {
    setSplash(false);
  }, 1500);
  return (
    <NavigationContainer>
{/* <SplashScreen />   */}
       {splash ? <SplashScreen /> : <AuthStack />}
       <Toast ref={(ref) => Toast.setRef(ref)} />
       {/* <DrawerScreen /> */}
    </NavigationContainer>

  );
};

export default App;
