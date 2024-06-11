import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import React from 'react';
import Header from '../../Assets/Constants/Header';
import images from '../../Assets/Constants/images';
import {colors} from '../../Assets/Constants/color';
import Slider from '../../Assets/Constants/Slider';
import Category from '../../Assets/Constants/Category';
import BrowseProduct from './Browse';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };
  return (
    <View>
      <Header
        title="Farmers"
        drawerImage={images.drawer}
        leftImage={images.Header_money}
        rightImage={images.Header_notification}
        onLeftImagePress={() => Alert.alert('Balance Pressed')}
        onRightImagePress={() => Alert.alert('Notification Pressed')}
        showLeftText={true}
        leftText="50"

      />

      <View style={styles.containermain}>
        <View style={styles.searchBarContainer}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.primarycolor}
          />
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            <View style={styles.searchInner}>
              <View style={styles.search}>
                <Image source={images.searchIcon} height={10} width={10} />
              </View>
              <TextInput
                style={styles.field}
                placeholder="Search.."
                placeholderTextColor={colors.text}
                onPress={() => navigation.navigate('Search')}
              />
              <TouchableOpacity>
                <View style={styles.imagemain}>
                  <Image source={images.filterIcon} style={styles.imageStyle} />
                </View>
              </TouchableOpacity>
            </View>

            <Slider />
            <Category />
            <BrowseProduct />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  containermain: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.white,
    paddingBottom: 40,
  },
  searchBarContainer: {
    marginBottom: 70,
    paddingBottom: 60,
  },
  searchInner: {
    flexDirection: 'row',
  },
  search: {
    position: 'absolute',
    top: 12,
    left: 10,
    zIndex: 1,
  },
  field: {
    paddingLeft: 40,
    backgroundColor: 'white',
    height: 45,
    borderRadius: 32,
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginRight: 10,
    borderWidth: 1,
  },
  imagemain: {
    height: 50,
    width: 50,
    backgroundColor: colors.secondarycolor,
    borderRadius: 34,
    alignContent: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
});
export default Home;
