import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import images from '../../Assets/Constants/images';
import Header from '../../Assets/Constants/Header';
import {colors} from '../../Assets/Constants/color';
import Button from '../../Assets/Constants/Button';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return subscriber;
  }, []);

  const handleLogOut = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            auth()
              .signOut()
              .then(() => {
                navigation.navigate('Login');
              });
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={styles.container}>
      <Header title="Profile" drawerImage={images.drawer} />
      <View style={styles.header}>
        <Image source={images.sliderImage2} style={styles.profileImage} />
        <Text style={styles.name}>Prince</Text>
        <Text style={styles.email}>prince@gmail.com</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farm Details</Text>
        <Text style={styles.sectionContent}>Sunrise Farms</Text>
        <Text style={styles.sectionContent}>
          123 Country Road, Farmingville
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Products</Text>
        <Text style={styles.sectionContent}>
          Organic Vegetables, Fresh Fruits, Dairy Products
        </Text>
      </View>
      <Button title="Logout" onPress={handleLogOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingRight: 10,
    paddingLeft: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primarycolor,
  },
  contact: {
    fontSize: 16,
    color: colors.text,
  },
  email: {
    fontSize: 16,
    color: colors.text,

    marginBottom: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primarycolor,
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: colors.text,
  },
});

export default Profile;
