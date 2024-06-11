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
import firestore from '@react-native-firebase/firestore';

type errorObj = {
  email?: string | undefined;
  password?: string | undefined;
  name?: string | undefined;
};

const Signup = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [formError, setFormError] = useState<errorObj>({});
  const ref = firestore().collection('users');

  const create = () => {
    const error: errorObj = {};
    if (!name) {
      error.name = 'Please Enter Name';
    }
    if (!email) {
      error.email = 'Please Enter Email';
    } else if (!password) {
      error.password = 'Please Enter Password';
    }
    setFormError(error);
    if (Object.keys(error).length === 0) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          const {user} = userCredential;
          if (user) {
            ref.doc(user.uid).set({
              uid: user.uid,
              name: name,
              email: email,
              password: password,
            });
          }
          setEmail('');
          setPassword('');
          setName('');
          Alert.alert('Register Successfully');
          navigation.navigate('Login');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          } else if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          } else if (error.code === 'auth/weak-password') {
            Alert.alert('Password should be at least 6 characters');
          } else {
            console.error(error);
          }
        });
    }

    //   auth()
    // .createUserWithEmailAndPassword(email, password)
    // .then((userCredential) => {
    //   const {user} = userCredential;
    //   if (user) {
    //     ref.doc(user.uid).set({
    //       uid: user.uid,
    //       name: name,
    //       email: email,
    //       password: password,
    //     });
    //   }
    //   setEmail("")
    //   setPassword("")
    //   Alert.alert('Register Successfully');
    //   navigation.navigate('Login')
    // })
    // .catch(error => {
    //   if (error.code === 'auth/email-already-in-use') {
    //     console.log('That email address is already in use!');
    //   }

    //   if (error.code === 'auth/invalid-email') {
    //     console.log('That email address is invalid!');
    //   }

    //   console.error(error);
    // });
  };

  GoogleSignin.configure({
    webClientId:
      '1019740554315-97nbr37999jicopkerd3337s6omt56e0.apps.googleusercontent.com',
  });

  // const googleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const usrInfo = await GoogleSignin.signIn();
  //     setUserInfo(usrInfo);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       Alert.alert('User cancelled the login process');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //       Alert.alert('Sign in is in progress already');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //       Alert.alert('Play services not available or outdated');
  //     } else {
  //       // some other error happened
  //       Alert.alert('Something went wrong with Google Sign In');
  //       console.error('Google Sign In Error:', error);
  //     }
  //   }
  // };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primarycolor} />
      <Text style={styles.header}>Create Account</Text>
      <Text style={styles.headertxt}>Let’s Create Account Together</Text>

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Name"
          activeOutlineColor={colors.primarycolor}
          style={styles.textinput}
          value={name}
          onChangeText={text => setName(text)}
        />
        {formError.name && <Text style={styles.error}>{formError.name}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Email"
          activeOutlineColor={colors.primarycolor}
          style={styles.textinput}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {formError.email && <Text style={styles.error}>{formError.email}</Text>}
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
      <TouchableOpacity
        style={styles.ButtonMain}
        onPress={() => {
          create();
        }}>
        <Text style={styles.Button}>sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signup}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signuptextmain}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
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
    alignSelf: 'center',
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
    marginLeft: 20,
  },
  Button: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },

  signup: {
    flexDirection: 'row',
    marginTop: 70,
    alignSelf: 'center',
  },
  signuptextmain: {
    fontWeight: 'bold',
    marginLeft: 5,
    alignSelf: 'center',
    color: colors.black,
  },
});

export default Signup;
