import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {colors} from '../../Assets/Constants/color';
import Header from '../../Assets/Constants/Header';
import Button from '../../Assets/Constants/Button';
import images from '../../Assets/Constants/images';
import Toast from 'react-native-toast-message';

const Cart = () => {
  const navigation = useNavigation();

  const [cartItems, setCartItems] = useState([]);
  const [uniqueItemCount, setUniqueItemCount] = useState(0);

  const fetchCartItems = async () => {
    const cart = await AsyncStorage.getItem('cart');
    if (cart) {
      const parsedCart = JSON.parse(cart);
      setCartItems(parsedCart);
      setUniqueItemCount(parsedCart.length);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchCartItems();
      return () => {};
    }, []),
  );

  const incrementQuantity = async key => {
    const updatedCart = cartItems.map(item => {
      if (item.key === key) {
        item.quantity = isNaN(item.quantity) ? 1 : item.quantity + 1;
      }
      return item;
    });
    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decrementQuantity = async key => {
    const updatedCart = cartItems.map(item => {
      if (item.key === key && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = async key => {
    const updatedCart = cartItems.filter(item => item.key !== key);
    setCartItems(updatedCart);
    setUniqueItemCount(updatedCart.length);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = async () => {
    setCartItems([]);
    setUniqueItemCount(0);
    await AsyncStorage.removeItem('cart');
    Toast.show({
      type: 'success',
      text1: 'Cart cleared',
      position: 'top',
      visibilityTime: 2000,
    });
  };

  const handleProceedToCheckout = () => {
    Toast.show({
      type: 'success',
      text1: `Checkout success`,
      position: 'top',
      visibilityTime: 2000,
    });
    navigation.navigate('Checkout', {
      cartItems,
      incrementQuantity,
      decrementQuantity,
    });

    // let totalBill = 0;
    // cartItems.forEach(item => {
    //   totalBill += item.quantity * item.price;
    // });
    // const formattedTotalBill = `₹${totalBill}`;

    // Alert.alert(
    //   'Proceed to Checkout',
    //   `Total Bill: ${formattedTotalBill}`,
    //   [
    //     {
    //       text: 'Cancel',
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'Proceed',
    //       onPress: () => {
    //         navigation.navigate('Checkout' , {cartItems,incrementQuantity, decrementQuantity});
    //       },
    //     },
    //   ],
    //   {cancelable: false},
    // );
  };

  const renderItem = ({item}) => {
    const totalPrice = item.quantity * item.price;
    return (
      <View style={styles.itemContainer}>
        <Text></Text>
        <View style={styles.maincontainer}>
          <Image source={item.img} style={styles.image} />
          <View style={styles.alldetail}>
            <View style={styles.nameprice}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>₹{totalPrice}</Text>
              {/* <Text style={styles.itemPrice}>{totalPrice}</Text> */}
            </View>
            <View style={styles.operator}>
              <View style={styles.quantityContainer}>
                <Button
                  title="-"
                  onPress={() => decrementQuantity(item.key)}
                  style={styles.btn}
                />
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Button
                  title="+"
                  onPress={() => incrementQuantity(item.key)}
                  style={styles.btn}
                />
              </View>
              <TouchableOpacity onPress={() => removeItem(item.key)}>
                <Image source={images.trash} style={styles.trashimage} />

                {/* <Text style={styles.removeButton}>Remove</Text> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.scrollContainer}>
      <Header
        title="Cart"
        drawerImage={images.drawer}
        leftImage={images.cost}
        rightImage={images.Header_money}
        showLeftText={true}
        leftText={uniqueItemCount.toString()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {cartItems.length>0 && (<Button
            title="Clear All"
            onPress={clearCart}
            style={styles.clearCartBtn}
          />)}
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            ListEmptyComponent={
              <View style={styles.emptycontainer}>
                <Image source={images.empty} style={styles.emptyimg} />
                <Text style={styles.emptyMessage}>Continue to Shopping</Text>
              </View>
            }
          />
        </View>
        {/* <Button title="Proceed to Checkout"  style={styles.checkoutbtn} onPress={}/> */}
        {cartItems.length > 0 && (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={styles.moreitem}>
              <Text style={styles.text}>Add More Item</Text>
            </TouchableOpacity>
            <Button
              title="Proceed to Checkout"
              onPress={handleProceedToCheckout}
              style={styles.checkoutbtn}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingBottom: 90,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  clearCartBtn: {
    alignSelf: 'flex-end',
    height: 40,
    marginTop:0
  },

  emptycontainer: {
    paddingTop: '50%',
  },
  emptyimg: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 5,
    borderColor: '#ccc',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  maincontainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // borderWidth:1
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  alldetail: {
    alignSelf: 'center',
    paddingLeft: 10,
    // borderWidth:1,
    width: '70%',
    justifyContent: 'space-between',
  },
  nameprice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth:1,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  itemPrice: {
    fontSize: 16,
    color: colors.primarycolor,
    fontWeight: 'bold',
  },
  operator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    borderRadius: 11,
    // height:35,
    // width:25,
  },
  trashimage: {
    height: 40,
    width: 40,
    marginTop: 10,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  checkoutbtn: {
    width: '90%',
    alignSelf: 'center',
  },
  moreitem: {
    width: '90%',
    alignSelf: 'center',
    // borderWidth:1
  },
  text: {
    color: colors.primarycolor,
    fontWeight: 'bold',
  },
  // removeButton: {
  //   color: colors.red,
  //   fontWeight: 'bold',
  //   alignItems:"center",
  //   // marginTop:20
  // },
});

export default Cart;
