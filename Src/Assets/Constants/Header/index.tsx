import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {colors} from '../color';
import images from '../images';

interface HeaderProps {
  title: string;
  leftImage?: any;
  rightImage?: any;
  onLeftImagePress?: () => void;
  onRightImagePress?: () => void;
  showLeftText?: boolean;
  leftText?: string;
  showBackButton?: boolean;
  drawerImage?: any;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftImage,
  rightImage,
  onLeftImagePress,
  onRightImagePress,
  showLeftText = false,
  leftText = '',
  showBackButton = false,
  drawerImage,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerStyle}>
      {drawerImage && (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.drawerButton}>
          <Image source={drawerImage} style={styles.drawerImageStyle} />
        </TouchableOpacity>
      )}
      {showBackButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image source={images.back} style={styles.backbtn} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.rightContainer}>
        {leftImage && (
          <TouchableOpacity onPress={onLeftImagePress}>
            <View
              style={[
                styles.leftImageContainer,
                showLeftText && styles.leftImageContainerWithText,
              ]}>
              <Image source={leftImage} style={styles.leftImageStyle} />
              {showLeftText && (
                <Text style={styles.leftTextStyle}>{leftText}</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        {rightImage && (
          <TouchableOpacity onPress={onRightImagePress}>
            <View style={styles.imagemain}>
              <Image source={rightImage} style={styles.imageStyle} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    padding: 10,
    backgroundColor: colors.white,
  },
  drawerButton: {
    marginRight: 10,
    backgroundColor: colors.secondarycolor,
    borderRadius: 34,
    height: 40,
    width: 40,
  },
  drawerImageStyle: {
    width: 30,
    height: 30,
    tintColor: colors.primarycolor,
    alignSelf: 'center',
    marginTop: 5,
  },
  backButton: {
    marginRight: 10,
  },
  backbtn: {
    height: 30,
    width: 30,
    color: colors.primarycolor,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    color: colors.primarycolor,
    fontWeight: 'bold',
  },
  leftImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondarycolor,
    borderRadius: 34,
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginRight: 10,
  },
  leftImageContainerWithText: {
    backgroundColor: colors.secondarycolor,
    borderRadius: 34,
    height: 50,
    width: 70,
    padding: 7,
    marginRight: 10,
  },
  leftImageStyle: {
    width: 30,
    height: 27,
    backgroundColor: colors.secondarycolor,
    borderRadius: 34,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  leftTextStyle: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  imagemain: {
    height: 50,
    width: 50,
    backgroundColor: colors.secondarycolor,
    borderRadius: 34,
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  imageStyle: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 130,
  },
});

export default Header;
