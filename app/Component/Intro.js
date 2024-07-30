import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const img = require('../assets/favicon.png');
const { width, height } = Dimensions.get('window');

const Intro = () => {
  return (
    <View style={styles.mainContainer}>
      <Image source={img} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  image: {
    width: 200,
    height: 200, 
    resizeMode: 'contain',
  },
});

export default Intro;
