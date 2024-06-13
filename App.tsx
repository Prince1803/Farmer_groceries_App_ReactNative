import 'react-native-gesture-handler';
import React, {createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './Src/Components/Auth/SplashScreen';
import {AuthStack} from './Src/Components/Navigation';
import Toast from 'react-native-toast-message';
import {StripeProvider} from '@stripe/stripe-react-native'

export const AuthenticatedUserContext = createContext({});

const AuthenticatedProvider = ({children}: any) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const Stripe_key='pk_test_51PQkcgP00E6usXEDZmpOX9tXPAQFNsRTp4qTp9Ye5eK1V2Oafmny3MiRzOvp5HpWssJ2sdHrAcWELcf6KlIOeZ4b00D5mclK3h'

const App = () => {
  const [splash, setSplash] = useState(true);
  setTimeout(() => {
    setSplash(false);
  }, 1500);
  return (
    
    <StripeProvider publishableKey={Stripe_key}>
    <NavigationContainer>
      <AuthenticatedProvider>
        {splash ? <SplashScreen /> : <AuthStack />}
        <Toast ref={ref => Toast.setRef(ref)} />
      </AuthenticatedProvider>
    </NavigationContainer>
    </StripeProvider>

  );
};

export default App;
