import {View, Text, StyleSheet, Pressable, FlatList, Image} from 'react-native';
import React from 'react';
import {colors} from '../color';
import {Categorydata} from '../data';
import {useNavigation} from '@react-navigation/native';

const Category = () => {
  const navigation = useNavigation();

  const renderItem = ({item}: any) => (
    <Pressable
      onPress={() => navigation.navigate('ProductList', {title: item.title})}>
      <View style={styles.itemContainer}>
        <Image source={item.img} style={styles.image} />
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.eventContainer}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Categories</Text>
        <Pressable>
          <Text style={styles.viewDetails}>View all</Text>
        </Pressable>
      </View>

      {Categorydata && Categorydata.length > 0 ? (
        <FlatList
          data={Categorydata}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
      ) : (
        'Error'
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  eventContainer: {
    width: '100%',
    height: 130,
    // marginTop: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 5,
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
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: colors.secondarycolor,
    borderRadius: 34,
    padding: 8,
    marginTop: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    textAlign: 'center',
    color: colors.text,
  },
});

export default Category;
