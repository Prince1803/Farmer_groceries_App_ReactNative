import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../Assets/Constants/color';
import Header from '../../../Assets/Constants/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../../Assets/Constants/Button';
import uuid from 'react-native-uuid';
import {BrProduct} from '../../../Assets/Constants/data';
import Toast from 'react-native-toast-message';

const ProductDetail = ({route, navigation}) => {
  const {product} = route.params;

  const [quantity, setQuantity] = useState(1);
  const [similarItems, setSimilarItems] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(`${product.id}`).then(value => {
      if (value) {
        setQuantity(parseInt(value));
      }
    });
  }, [product.id]);

  useEffect(() => {
    const filteredSimilarItems = BrProduct.filter(
      item => item.id !== product.id && item.title !== product.title,
    );
    setSimilarItems(filteredSimilarItems);
  }, [product]);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    AsyncStorage.setItem(`${product.id}`, newQuantity.toString());
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      AsyncStorage.setItem(`${product.id}`, newQuantity.toString());
    }
  };

  const addToCart = async () => {
    const cartItem = {
      ...product,
      key: uuid.v4(),
      quantity: quantity,
    };
    let cart = await AsyncStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    // cart.push(cartItem)

    const index = cart.findIndex(item => item.id === product.id);
    if (index >= 0) {
      cart[index].quantity += quantity;
    } else {
      cart.push(cartItem);
    }
    await AsyncStorage.setItem('cart', JSON.stringify(cart));

    Toast.show({
      type: 'success',
      text1: `${product.title} added to cart successfully`,
      position: 'top',
      visibilityTime: 2000,
    });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', {product: item})}>
      <View style={styles.similarItem}>
        <Image source={item.img} style={styles.similarItemImage} />
        <Text style={styles.similarItemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Header showBackButton={true} title={`${product.title} Details`} />
        <Image source={product.img} style={styles.image} />
        <View style={styles.detailcontainer}>
          <Text style={styles.text}>Details:</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        <View style={styles.detailmain}>
          <View>
            <Text style={styles.grams}>{product.grams}</Text>
            <Text style={styles.price}>₹{product.price}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <Button title="-" onPress={decrementQuantity} style={styles.btn} />
            <Text style={styles.quantity}>{quantity}</Text>
            <Button title="+" onPress={incrementQuantity} style={styles.btn} />
          </View>
        </View>
        <Button title="Add to Cart" onPress={addToCart} />
      </View>
      <View style={styles.similarItemsContainer}>
        <Text style={styles.similarItemsTitle}>Similar Items</Text>
        <FlatList
          horizontal
          data={similarItems}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingBottom: 20,
  },
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    color: colors.black,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  detailcontainer: {
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: colors.black,
    margin: 10,
    marginLeft: 0,
  },
  grams: {
    fontSize: 20,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: colors.primarycolor,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: colors.text,
  },
  detailmain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  btn: {
    borderRadius: 11,
  },
  similarItemsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  similarItemsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primarycolor,
  },
  similarItem: {
    marginRight: 10,
  },
  similarItemImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  similarItemTitle: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default ProductDetail;
