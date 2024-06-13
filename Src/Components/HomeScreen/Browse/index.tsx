import {View, Text, Pressable, StyleSheet, FlatList, Image, Dimensions} from 'react-native';
import React from 'react';
import {colors} from '../../../Assets/Constants/color';
import {BrProduct} from '../../../Assets/Constants/data';
import Button from '../../../Assets/Constants/Button';
import {useNavigation} from '@react-navigation/native';

const BrowseProduct = () => {
  const navigation = useNavigation();
  const {width} = Dimensions.get('window');
  const itemWidth = (width - 60) / 2;
  const renderItem = ({item}: any) => (
    <Pressable
      onPress={() => navigation.navigate('ProductDetail', {product: item})}>
      <View style={[styles.itemContainer, {width: itemWidth}]}>
        <View style={styles.itemimg}>
          <Image source={item.img} style={styles.image} />
        </View>
        <View style={styles.detailcontainer}>
          <Text style={styles.text}>{item.title}</Text>
          <View style={styles.detailmain}>
            <View>
              <Text style={styles.text}>₹{item.price}</Text>
            </View>
            <View style={styles.detail}>
              <Image source={item.star} />
              <Text style={styles.text}>{item.rating}</Text>
              <Text style={styles.ratertext}>{item.rater}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Browse Products</Text>
        <Pressable>
          <Text style={styles.viewDetails}>View all</Text>
        </Pressable>
      </View>
      <View style={styles.itemcontainermain}>

      {BrProduct && BrProduct.length > 0 ? (
        <FlatList
        data={BrProduct}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        />
        ) : (
          'Error'
          )}
        </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  main:{
    // borderWidth:1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 15,
  },

  mainTitle: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'left',
  },
  viewDetails: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 19,
  },
  itemcontainermain:{
    // borderWidth:1,
    alignItems:"center",

  },
  itemContainer: {
    marginTop: 5,
    // marginLeft:15,
    marginRight: 12,
    // marginLeft:8,
    // borderWidth:1,
    marginLeft: 4,

    // alignSelf:"center"
  },
  itemimg: {},
  image: {
    width: 160,
    height: 162,
    // marginRight: 12,
    alignSelf: 'center',
  },
  text: {
    color: colors.text,
    fontWeight: '500',
    fontSize: 16,
  },
  ratertext:{
    color: colors.text,
  },
  detailmain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailcontainer: {
    margin: 10,
    marginRight: 0,
  },
  detail: {
    flexDirection: 'row',
    paddingRight: 10,
  },
});

export default BrowseProduct;
