import {View, Text, StyleSheet, TextInput, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../Assets/Constants/Header';
import {colors} from '../../../Assets/Constants/color';
import {useNavigation} from '@react-navigation/native';
import {
  BrProduct,
  Categorydata,
  productdetails,
} from '../../../Assets/Constants/data';
import images from '../../../Assets/Constants/images';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const allData = [...productdetails, ...BrProduct];

  useEffect(() => {
    setSearchResults(allData);
  }, []);

  const handleSearch = text => {
    setSearchQuery(text);

    const filteredResults = allData.filter(item => {
      if (item.title && item.title.toLowerCase().includes(text.toLowerCase())) {
        return true;
      }
      if (item.name && item.name.toLowerCase().includes(text.toLowerCase())) {
        return true;
      }
      return false;
    });

    setSearchResults(filteredResults);
  };
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.maincontainer}>
        <Image source={item.image || item.img} style={styles.image} />
        <View style={styles.alldetail}>
          <View style={styles.nameprice}>
            <Text style={styles.itemTitle}>{item.title || item.name}</Text>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.scrollContainer}>
      <Header showBackButton={true} title="Serach" />
      <View style={styles.headerStyle}>
        <TextInput
          style={styles.field}
          placeholder="Search.."
          placeholderTextColor={colors.black}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {searchQuery.length > 0 && searchResults.length === 0 ? (
        <View style={styles.noItemsContainer}>
          <Image source={images.not_found} style={styles.notfound} />
          <Text style={styles.noItemsText}>No items found</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingBottom: 20,
  },
  headerStyle: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  field: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 32,
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: colors.black,

    borderWidth: 1,
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
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notfound: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  noItemsText: {
    fontSize: 18,
    color: colors.text,
  },
});

export default SearchScreen;
