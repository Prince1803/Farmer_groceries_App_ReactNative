import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../Assets/Constants/Header';
import images from '../../Assets/Constants/images';
import Button from '../../Assets/Constants/Button';
import {colors} from '../../Assets/Constants/color';
import Category from '../../Assets/Constants/Category';
import BrowseProduct from '../HomeScreen/Browse';
import Slider from '../../Assets/Constants/Slider';
import ExploreProduct from './Product';

const Explore = () => {
  return (
    <View>
      <Header
        title="Explore"
        drawerImage={images.drawer}

        leftImage={images.Header_heart}
        rightImage={images.Header_filter}
      />

      {/* <Button title="Add to Cart"/> */}

      <View style={styles.containermain}>
        <View style={styles.container}></View>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <Category />
          <Slider />
          {/* <ExploreProduct /> */}
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
    // paddingBottom: 40,
    marginBottom: 160,
    // borderWidth:1
  },
  container: {
    // paddingBottom: 60,
  },
});

export default Explore;
