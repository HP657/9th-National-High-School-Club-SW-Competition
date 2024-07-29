import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

const img = require('../assets/favicon.png');

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: height,
    backgroundColor: 'gray',
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
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
    height: (height / (5/1)), // 고정된 높이 설정
    marginHorizontal: 10, 
    justifyContent: 'center', // 버튼 내 텍스트를 세로 중앙 정렬
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
});

const FirstPage = () => {
  const handlePress = () => {
    alert('버튼이 클릭되었습니다!');
  };
  
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image source={img} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>버튼 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>버튼 2</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FirstPage;
