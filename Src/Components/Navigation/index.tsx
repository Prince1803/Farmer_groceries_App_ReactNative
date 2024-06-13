import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Auth/Login';
import Signup from '../Auth/SignUp';
import {TabNav} from '../../Assets/Constants/BottomTab';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../Assets/Constants/color';
import {Text} from 'react-native-paper';
import ProductList from '../HomeScreen/ProductList';
import ProductDetail from '../HomeScreen/ProductDetail';
import SearchScreen from '../HomeScreen/SearchScreen';
import CheckoutScreen from '../CartScreen/CheckoutScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomeDrawer from '../../Assets/Constants/CustomeDrawer';
import images from '../../Assets/Constants/images';
import Explore from '../ExploreScreen';
import Cart from '../CartScreen';
import Profile from '../ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Drawer"
        component={DrawerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomeDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: colors.secondarycolor,
        drawerActiveTintColor: colors.primarycolor,
        drawerInactiveTintColor: colors.text,
        drawerLabelStyle: {marginLeft: -20, fontSize: 15},
        // overlayColor:colors.secondarycolor
      }}>
      <Drawer.Screen
        name="Home"
        component={BottomTab}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.BottomHome}
              tintColor={color}
              style={styles.img}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Explore"
        component={Explore}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.BottomExplore}
              tintColor={color}
              style={styles.img}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.BottomCart}
              tintColor={color}
              style={styles.img}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.BottomProfile}
              tintColor={color}
              style={styles.img}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      {TabNav?.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.title}
            component={item.component}
            options={{
              tabBarStyle: {height: 60},
              tabBarIcon: ({focused}: any) => (
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={item.src}
                    resizeMode="stretch"
                    style={{
                      ...styles.iconImg,
                      tintColor: focused
                        ? colors.primarycolor
                        : colors.background,
                    }}
                  />
                  <Text
                    style={{
                      ...styles.tebText,
                      color: focused ? colors.primarycolor : colors.background,
                    }}>
                    {item.title}
                  </Text>
                </View>
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconImg: {
    width: 20,
    height: 20,
  },
  tebText: {
    fontSize: 12,
    width: '100%',
    textAlign: 'center',
  },
  img: {
    height: 23,
    width: 25,
  },
});
export default BottomTab;
