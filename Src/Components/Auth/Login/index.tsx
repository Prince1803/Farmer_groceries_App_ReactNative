import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../../Assets/Constants/images';
import {colors} from '../../../Assets/Constants/color';
import {TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

type errorObj = {
  email?: string | undefined;
  password?: string | undefined;
};

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [formError, setFormError] = useState<errorObj>({});

  const create = () => {
    const error: errorObj = {};
    if (!email) {
      error.email = 'Please Enter Email';
    }
    if (!password) {
      error.password = 'Please Enter Password';
    }

    setFormError(error);
    if (Object.keys(error).length === 0) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setEmail('');
          setPassword('');
          navigation.navigate('Drawer');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }
          if (error.code === 'auth/user-not-found') {
            Alert.alert('No user found with this email address!');
          }
          if (error.code === 'auth/wrong-password') {
            Alert.alert('Incorrect password!');
          }
          console.error(error);
        });
    }
    // auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(() => {
    //     setEmail('');
    //     setPassword('');

    //     navigation.navigate('Bottom');
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //     }
    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //       Alert.alert('Plese Enter Coorect data ');
    //     }
    //     console.error(error);
    //   });
  };

  GoogleSignin.configure({
    webClientId:
      '1019740554315-97nbr37999jicopkerd3337s6omt56e0.apps.googleusercontent.com',
  });

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      setUserInfo(usrInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('User cancelled the login process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        Alert.alert('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert('Play services not available or outdated');
      } else {
        // some other error happened
        Alert.alert('Something went wrong with Google Sign In');
        console.error('Google Sign In Error:', error);
      }
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primarycolor}
      />
      <View style={styles.container}>
        <View style={styles.maincontainer}>
          <Text style={styles.header}>Hello Again!</Text>
          <Text style={styles.headertxt}>Welcome Back You’ve Been Missed!</Text>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Email"
              activeOutlineColor={colors.primarycolor}
              style={styles.textinput}
              value={email}
              onChangeText={text => setEmail(text)}
            />
            {formError.email && (
              <Text style={styles.error}>{formError.email}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Password"
              secureTextEntry={true}
              activeOutlineColor={colors.primarycolor}
              style={styles.textinput}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            {formError.password && (
              <Text style={styles.error}>{formError.password}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.ButtonMain} onPress={create}>
            <Text style={styles.Button}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialmain}>
            <View style={styles.social}>
              <TouchableOpacity onPress={googleSignIn}>
                <Image
                  source={images.google}
                  style={styles.google}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.social}>
              <TouchableOpacity>
                <Image
                  source={images.facebook}
                  style={styles.google}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.social}>
              <TouchableOpacity>
                <Image
                  source={images.twitter}
                  style={styles.google}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.signup}>
            <Text>Don't have account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signuptextmain}>Sign Up for free</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },

  container: {
    height: '100%',
    width: '100%',
  },
  maincontainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  header: {
    marginTop: 100,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
  headertxt: {
    alignSelf: 'center',
    fontSize: 16,
  },
  inputContainer: {
    width: '90%',
    marginTop: 20,
  },

  textinput: {
    alignSelf: 'center',
    width: '100%',
  },
  error: {
    color: colors.red,
    marginTop: 5,
  },

  ButtonMain: {
    width: '90%',
    height: 50,
    borderRadius: 5,
    backgroundColor: colors.primarycolor,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '90%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.text,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: colors.black,
  },
  socialmain: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,

    width: '50%',
  },
  social: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: colors.splash,
    justifyContent: 'center',
    alignItems: 'center',
  },
  google: {
    height: 35,
    width: 35,
  },
  signup: {
    flexDirection: 'row',
    marginTop: 100,
    alignSelf: 'center',
  },
  signuptextmain: {
    fontWeight: 'bold',
    marginLeft: 5,
    alignSelf: 'center',
    color: colors.black,
  },
});

export default Login;
