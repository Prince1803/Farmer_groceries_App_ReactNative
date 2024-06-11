import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../Assets/Constants/Header';
import images from '../../Assets/Constants/images';
import {colors} from '../../Assets/Constants/color';
import Category from '../../Assets/Constants/Category';
import BrowseProduct from '../HomeScreen/Browse';
import Slider from '../../Assets/Constants/Slider';

const Explore = () => {
  return (
    <View>
      <Header
        title="Explore"
        drawerImage={images.drawer}
        leftImage={images.Header_heart}
        rightImage={images.Header_filter}
      />

      <View style={styles.containermain}>
        <View style={styles.container}></View>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <Category />
          <Slider />
          <BrowseProduct />
        </ScrollView>
      </View>
    </View>
  );
};
export const styles = StyleSheet.create({
  containermain: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.white,
    marginBottom: 160,
  },
  container: {},
});

export default Explore;
