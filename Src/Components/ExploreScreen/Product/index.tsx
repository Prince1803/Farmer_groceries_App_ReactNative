import {View, Text, Pressable, StyleSheet, FlatList, Image} from 'react-native';
import React from 'react';
import {colors} from '../../../Assets/Constants/color';
import {BrProduct} from '../../../Assets/Constants/data';
import Button from '../../../Assets/Constants/Button';

const ExploreProduct = () => {
  const renderItem = ({item}: any) => (
    // console.log(item)

    <View style={styles.itemContainer}>
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
            <Text>{item.rater}</Text>
          </View>
        </View>
        <Button title="Add to Cart" style={styles.btn} />
      </View>
    </View>
  );

  return (
    <View>
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
  );
};

export const styles = StyleSheet.create({
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
  itemContainer: {
    marginTop: 5,
  },
  itemimg: {},
  image: {
    width: 179,
    height: 180,
    marginRight: 15,
  },
  text: {
    color: colors.text,
    fontWeight: '500',
    fontSize: 16,
  },
  detailmain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailcontainer: {
    margin: 10,
  },
  detail: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  btn: {
    marginRight: 10,
  },
});

export default ExploreProduct;
