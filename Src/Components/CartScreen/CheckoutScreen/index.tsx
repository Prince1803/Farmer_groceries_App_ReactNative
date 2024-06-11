import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import Header from '../../../Assets/Constants/Header';
import {colors} from '../../../Assets/Constants/color';
import Button from '../../../Assets/Constants/Button';
import images from '../../../Assets/Constants/images';
import Toast from 'react-native-toast-message';

const CheckoutScreen = ({route}) => {
  const {cartItems, incrementQuantity, decrementQuantity} = route.params;

  let totalBill = 0;
  cartItems.forEach(item => {
    totalBill += item.quantity * item.price;
  });

  const handleorder=()=>{
    
    Toast.show({
        type: 'success',
        text1: `order Placed`,
        position: 'top',
        visibilityTime: 2000,
      });
  }

  const renderItem = ({item}) => {
    const totalPrice = item.quantity * item.price;
    // subtotal += totalPrice;

    return (
      //   <View style={styles.itemContainer}>
      //     <Image source={item.img} style={styles.image} />
      //     <View style={styles.detailmain}>

      //     <Text style={styles.itemTitle}>{item.title}</Text>
      //     <Text style={styles.itemPrice}>₹{item.price}</Text>
      //     </View>
      //     {/* Add increment and decrement functionality here */}
      //   </View>
      // );
      <View style={styles.itemContainer}>
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
                {/* <Button
                  title="-"
                  onPress={() => decrementQuantity(item.key)}
                  style={styles.btn}
                /> */}

                <Text style={styles.quantity}>Item: {item.quantity}</Text>
                {/* <Button
                  title="+"
                  onPress={() => incrementQuantity(item.key)}
                  style={styles.btn}
                /> */}
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
      <Header title="Checkout"  showBackButton={true}/>
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
              <Text style={styles.billtext}>₹{totalBill}</Text>
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
              <Text style={styles.billtext}>₹20</Text>
            </View>
            <View style={styles.billtotal}>
              <Text style={styles.billtotaltext}>Total</Text>
              <Text style={styles.billtotaltext}>{(totalBill += 42)}</Text>
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
        <Button title='Place Order'
         onPress={handleorder} 
         />
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
    // paddingLeft: 15,
  },
  viewDetails: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 19,
  },
  addresscontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom:
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
    // alignSelf:"center"
  },
  shippingaddress: {
    // margin:10,
    padding: 10,
  },
  shippingno: {
    paddingLeft: 10,
  },
  quantity: {
    // marginHorizontal: 10,
    fontSize: 18,
    color: colors.primarycolor,
  },
  //   operator: {
  //     flexDirection: 'row',
  //     // justifyContent: 'flex-end',
  //   },
  //   quantityContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //   },
  //   btn: {
  //     borderRadius: 11,
  //     // height:35,
  //     // width:25,
  //   },
});

export default CheckoutScreen;
