import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {colors} from '../color';
import images from '../images';

const CustomeDrawer = props => {
  return (
    <View style={styles.header}>
      <DrawerContentScrollView>
        <ImageBackground
          source={images.drawerbg}
          resizeMode="cover"
          style={styles.bgimg}>
          <View>
            <Image source={images.userimg} style={styles.profileimg} />
            <View
              style={{
                backgroundColor: colors.white,
                width: '100%',
                opacity: 2,
                borderRadius: 5,
                paddingLeft: 5,
              }}>
              <Text style={styles.profiletext}>Prince Ratanpara</Text>
              <Text style={styles.profiletext1}>₹50</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.list}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={styles.bottommain}>
        <TouchableOpacity style={styles.bottomfirst}>
          <View style={styles.bottomfirstcontain}>
            <Image
              source={images.share}
              style={styles.shareimg}
              resizeMode="contain"
            />
            <Text style={styles.sharetxt}>Share with Friends </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomfirst}>
          <View style={styles.bottomfirstcontain}>
            <Image
              source={images.logout}
              style={styles.shareimg}
              resizeMode="contain"
            />
            <Text style={styles.sharetxt}>Sign Out </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  homeBack: {
    height: 400,
    width: '100%',
  },
  bgimg: {
    backgroundColor: '#000000',
    padding: 20,
    opacity: 0.7,
    zIndex: -2,
    top: -5,
  },
  profileimg: {
    height: 80,
    width: 80,
    marginBottom: 10,
    borderRadius: 40,
  },
  profiletext: {
    fontSize: 22,
    color: colors.black,
    fontWeight: 'bold',
  },
  profiletext1: {
    fontSize: 18,
    color: colors.black,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 6,
  },
  bottommain: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  bottomfirst: {
    paddingVertical: 15,
  },
  bottomfirstcontain: {
    flexDirection: 'row',
  },
  shareimg: {
    height: 20,
    width: 20,
  },
  sharetxt: {
    fontSize: 15,
    color: colors.text,
    marginLeft: 5,
    fontWeight: '500',
  },
});

export default CustomeDrawer;
