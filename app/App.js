import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatRoom from './Component/ChatRoom';
import Login from './Component/Login';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleLoginSuccess = (user) => {
    setUserInfo(user);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatRoom">
        <Stack.Screen name="ChatRoom">
          {props => <ChatRoom {...props} userInfo={userInfo} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
