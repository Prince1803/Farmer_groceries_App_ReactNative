import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import images from '../images';
import {colors} from '../color';

const Slider = () => {
  const imgs = [
    images.sliderImage1,
    images.sliderImage2,
    images.sliderImage1,
    images.sliderImage2,
  ];
  const {width} = Dimensions.get('window');
  const height = width * 0.5;
  const [active, setActive] = useState(0);
  const scrollViewRef = useRef(null);
  const totalSlides = imgs.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prevActive => {
        const nextIndex = (prevActive + 1) % totalSlides;
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: nextIndex * width,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [width]);

  const change = ({nativeEvent}) => {
    const layoutMeasurement = nativeEvent.layoutMeasurement || {};
    const contentOffset = nativeEvent.contentOffset || {};
    const slide = Math.ceil(contentOffset.x / layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  };
  return (
    <View style={styles.Container}>
      <ScrollView
        ref={scrollViewRef}
        pagingEnabled
        horizontal
        onScroll={change}
        showsHorizontalScrollIndicator={false}
        style={{width, height}}>
        {imgs.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={{width, height, resizeMode: 'contain'}}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {imgs.map((i, k) => (
          <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
            •
          </Text>
        ))}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -16,
    alignSelf: 'center',
  },
  dot: {
    color: '#888',
    fontSize: 50,
  },
  activeDot: {
    color: colors.primarycolor,
    fontSize: 50,
  },
});

export default Slider;
