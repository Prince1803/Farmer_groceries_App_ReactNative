import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../Assets/Constants/Header';
import {colors} from '../../../Assets/Constants/color';
import Button from '../../../Assets/Constants/Button';
import images from '../../../Assets/Constants/images';
import Toast from 'react-native-toast-message';
import {CardField, initPaymentSheet, presentPaymentSheet, useStripe} from '@stripe/stripe-react-native';

const CheckoutScreen = ({route}) => {
  const [Total, setTotal] = useState();
  const [Amout, setAmout] = useState();

  const {cartItems, incrementQuantity, decrementQuantity} = route.params;
  const {confirmPayment} = useStripe();

  let totalBill = 0;

  useEffect(() => {
    cartItems.forEach(item => {
      const totalAmout = (totalBill += item.quantity * item.price);
      setAmout(totalAmout);
      const total = totalBill + 38;
      setTotal(total);
    });
  }, [Total]);


  const createPaymentIntent = async (amount: number) => {
    console.log(amount);
    try {
      const response = await fetch(
        'https://31d3-1-22-54-189.ngrok-free.app/payments/intents',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({amount}),
        },
      );

      console.log('response', response);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create payment intent');
      return null;
    }
  };

  const onCheckout = async () => {
    const paymentIntentData = await createPaymentIntent(
      Math.floor(Total * 100),
    );

    if (!paymentIntentData) {
      return;
    }

    const {error: initError} = await initPaymentSheet({
      merchantDisplayName: 'Farmers',
      paymentIntentClientSecret: paymentIntentData.paymentIntent,
      defaultBillingDetails: {
        name:  'Michael Miller',
      },
    });

    if (initError) {
      Alert.alert('Something went wrong', initError.message);
      return;
    }

    const {error: paymentError} = await presentPaymentSheet();

    if (paymentError) {
      Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
      return;
    }

    onCreateOrder();
  };

  const onCreateOrder = () => {
    console.log('Order created successfully!');
    Alert.alert('Success', 'Payment successful and order created!');
  };
  const renderItem = ({item}) => {
    const totalPrice = item.quantity * item.price;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.maincontainer}>
          <Image source={item.img} style={styles.image} />
          <View style={styles.alldetail}>
            <View style={styles.nameprice}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>₹{totalPrice}</Text>
            </View>
            <View style={styles.operator}>
              <View style={styles.quantityContainer}>
                <Text style={styles.quantity}>Item: {item.quantity}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <Header title="Checkout" showBackButton={true} />
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />

        <View style={styles.coupancontainer}>
          <TouchableOpacity>
            <Text style={styles.coupontext}>Apply Coupon</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.header}>Invoice</Text>
          <View style={styles.itemContainer}>
            <View style={styles.bill}>
              <Text style={styles.billtext}>Price</Text>
              <Text style={styles.billtext}>₹{Amout}</Text>
            </View>
            <View style={styles.bill}>
              <Text style={styles.billtext}>Delivery</Text>
              <Text style={styles.billtextadd}>+ ₹40</Text>
            </View>

            <View style={styles.bill}>
              <Text style={styles.billtext}>GST</Text>
              <Text style={styles.billtextadd}>+₹18</Text>
            </View>

            <View style={styles.bill}>
              <Text style={styles.billtext}>Discount</Text>
              <Text style={styles.billtext}>-₹20</Text>
            </View>
            <View style={styles.billtotal}>
              <Text style={styles.billtotaltext}>Total</Text>
              <Text style={styles.billtotaltext}>{Total}</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.address}>
            <Text style={styles.mainTitle}>Shipping Details</Text>
            <Pressable>
              <Text style={styles.viewDetails}>Edit</Text>
            </Pressable>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.addresscontainer}>
              <Text style={styles.addresstext}>Michael Miller</Text>
              <View style={styles.addressselectmain}>
                <Text style={styles.addressselect}>Home</Text>
                <Image source={images.dropdown} style={styles.img} />
              </View>
            </View>
            <Text style={styles.shippingaddress}>
              70 Washington Square South, New York, NY 10012, United States
            </Text>
            <Text style={styles.shippingno}>+91 12345 67890</Text>
          </View>
        </View>
        <View style={styles.coupancontainer}>
          <TouchableOpacity>
            <Text style={styles.coupontext}>Add Delivery Instructions</Text>
          </TouchableOpacity>
        </View>
        <Button title="Place Order" onPress={onCheckout} />
      </View>
    </ScrollView>
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
  itemContainer: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 5,
    borderColor: '#ccc',
  },
  maincontainer: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  alldetail: {
    alignSelf: 'center',
    paddingLeft: 10,

    width: '70%',
    justifyContent: 'space-between',
  },
  nameprice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  coupancontainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    borderColor: '#ccc',
    marginTop: 10,
  },
  coupontext: {
    color: colors.primarycolor,
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 10,
  },
  header: {
    fontSize: 20,
    color: colors.primarycolor,
  },
  bill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  billtext: {
    fontSize: 16,
  },
  billtextadd: {
    color: colors.red,
  },
  billtotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  billtotaltext: {
    fontSize: 20,
    color: colors.primarycolor,
    fontWeight: 'bold',
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 15,
    marginTop: 10,
  },

  mainTitle: {
    color: colors.primarycolor,
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'left',
  },
  viewDetails: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 19,
  },
  addresscontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addresstext: {
    fontSize: 18,
    color: colors.text,
    fontWeight: 'bold',
  },
  addressselectmain: {
    flexDirection: 'row',
  },

  addressselect: {
    fontSize: 18,
    color: colors.primarycolor,
    fontWeight: 'bold',
  },
  img: {
    height: 15,
    width: 15,
    marginTop: 7,
  },
  shippingaddress: {
    padding: 10,
  },
  shippingno: {
    paddingLeft: 10,
  },
  quantity: {
    fontSize: 18,
    color: colors.primarycolor,
  },
  card: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});

export default CheckoutScreen;
