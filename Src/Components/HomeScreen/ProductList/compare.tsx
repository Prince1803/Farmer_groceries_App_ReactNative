/ eslint-disable prettier/prettier /
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../constent/Colors';
import {fonts} from '../../constent/fonts';
import image from '../../constent/Images';
import {data} from '../../constent/Data';
import Card from './Card';

interface Data {
  category: string;
  title: string;
  rate: number;
  rating:any;
  count: number;
  price: number;
  image: any;
}

const ProductList = ({route}) => {
  const {name} = route.params;
  const [productList, setProductList] = React.useState([]);

  useEffect(() => {
    const filterData = data.filter(item => item.category === name);
    setProductList(filterData);
    return () => {};
  }, [name]);

  const renderProductCard = ({item}: {item: Data}) => (
    <Card
      image={item.image}
      category={item.category}
      title={item.title}
      rate={item.rating.rate}
      count={item.rating.count}
      price={item.price}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productList}
        renderItem={renderProductCard}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.cards}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  card: {
    width: '48%',
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'stretch',
  },
  content: {
    padding: 10,
  },
  categories: {
    color: colors.grayColor,
    fontFamily: fonts.PoppinsRegular,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.PoppinsBold,
    color: colors.black,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  reviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  review: {
    marginRight: 5,
    fontFamily: fonts.PoppinsRegular,
  },
  count: {
    color: colors.grayColor,
    fontFamily: fonts.PoppinsRegular,
  },
  price: {
    color: colors.darkGreen,
    fontSize: 18,
    fontFamily: fonts.PoppinsBold,
  },
  star: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
});

export default ProductList;
