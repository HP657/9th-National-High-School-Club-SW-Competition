import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';

const img = require('../assets/favicon.png');
const { width, height } = Dimensions.get('window');

const Intro = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const fadeOut = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('FirstPage');
      });
    };

    const timeout = setTimeout(fadeOut, 2000);

    return () => {
      clearTimeout(timeout);
      fadeAnim.setValue(1); 
    };
  }, [fadeAnim, navigation]);

  return (
    <Animated.View style={[styles.mainContainer, { opacity: fadeAnim }]}>
      <Image source={img} style={styles.image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Intro;
