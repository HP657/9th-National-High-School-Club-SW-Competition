import React, { useRef, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, Animated } from 'react-native';
import Intro from './Intro';

const img = require('../assets/favicon.png');

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '40%',
    height: height / 4,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  introContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});

const FirstPage = () => {
  const fadeIntroAnim = useRef(new Animated.Value(1)).current;
  const fadeMainAnim = useRef(new Animated.Value(0)).current;
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const introTimeout = setTimeout(() => {
      Animated.timing(fadeIntroAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setIntroVisible(false); 
      });
    }, 2000);

    const mainTimeout = setTimeout(() => {
      Animated.timing(fadeMainAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 1000);

    return () => {
      clearTimeout(introTimeout);
      clearTimeout(mainTimeout);
    };
  }, [fadeIntroAnim, fadeMainAnim]);

  const handlePress = () => {
    alert('버튼이 클릭되었습니다!');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image source={img} style={styles.image} />
      </View>
      <Animated.View style={[styles.textContainer, { opacity: fadeMainAnim }]}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>버튼 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>버튼 2</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      {introVisible && (
        <Animated.View style={[styles.introContainer, { opacity: fadeIntroAnim }]}>
          <Intro />
        </Animated.View>
      )}
    </View>
  );
};

export default FirstPage;
