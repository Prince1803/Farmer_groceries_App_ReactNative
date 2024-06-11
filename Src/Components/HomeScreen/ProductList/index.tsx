import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {productdetails} from '../../../Assets/Constants/data';
import {colors} from '../../../Assets/Constants/color';
import Header from '../../../Assets/Constants/Header';
import images from '../../../Assets/Constants/images';

const ProductList = ({route}: any) => {
  const {title} = route.params;
  const [product, setProduct] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    const filteredProducts = productdetails.filter(item => item.type === title);
    setProduct(filteredProducts);
  }, [title]);

  useEffect(() => {
    if (selectedFilter) {
      applyFilter();
    }
  }, [selectedFilter]);

  const handleFilter = () => {
    setIsModalVisible(true);
  };

  const applyFilter = () => {
    let sortedProducts = [...product];
    if (selectedFilter === 'A-Z') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedFilter === 'Z-A') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (selectedFilter === 'Price: Low to High') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === 'Price: High to Low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProduct(sortedProducts);
    setIsModalVisible(false);
  };

  const renderItem = ({item}: any) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemimg}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.detailcontainer}>
        <Text style={styles.text}>{item.name}</Text>
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
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title={title}
        showBackButton={true}
        rightImage={images.filterIcon}
        onRightImagePress={handleFilter}
      />
      <FlatList
        data={product}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        // columnWrapperStyle={styles.cards}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No items found</Text>
        }
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <TouchableOpacity onPress={() => setSelectedFilter('A-Z')}>
              <View style={styles.modaltext}>
                <Text style={styles.modalOption}>A-Z</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedFilter('Z-A')}>
              <View style={styles.modaltext}>
                <Text style={styles.modalOption}>Z-A</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedFilter('Price: Low to High')}>
              <View style={styles.modaltext}>
                <Text style={styles.modalOption}>Price: Low to High</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedFilter('Price: High to Low')}>
              <View style={styles.modaltext}>
                <Text style={styles.modalOption}>Price: High to Low</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalClose}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingLeft: 10,
    paddingRight: 10,
  },
  cards: {},

  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primarycolor,
  },
  modaltext: {
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
  },
  modalOption: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: colors.black,
  },
  modalClose: {
    fontSize: 16,
    color: colors.red,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProductList;
