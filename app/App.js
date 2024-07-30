import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstPage from './Component/FirstPage';
import ChatRoom from './Component/ChatRoom';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FirstPage" component={FirstPage} />
      </Stack.Navigator> */}
      <ChatRoom />
    </NavigationContainer>
  );
};

export default App;
