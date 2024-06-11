import 'react-native-gesture-handler';
import React, {createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './Src/Components/Auth/SplashScreen';
import {AuthStack} from './Src/Components/Navigation';
import Toast from 'react-native-toast-message';

export const AuthenticatedUserContext = createContext({});

const AuthenticatedProvider = ({children}: any) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const App = () => {
  const [splash, setSplash] = useState(true);
  setTimeout(() => {
    setSplash(false);
  }, 1500);
  return (
    <NavigationContainer>
      <AuthenticatedProvider>
        {splash ? <SplashScreen /> : <AuthStack />}
        <Toast ref={ref => Toast.setRef(ref)} />
      </AuthenticatedProvider>
    </NavigationContainer>
  );
};

export default App;
