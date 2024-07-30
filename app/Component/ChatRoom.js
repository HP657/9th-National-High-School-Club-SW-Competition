import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import Login from './Login';

const ChatRoom = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn]);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/user/info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setUserInfo(result.data); 
      fetchMessages(result.data.userId);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/api/chatroom/${userId}/messages`);
      const result = await response.json();
      setMessages(result);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSend = () => {
    if (inputText.trim() && userInfo && userInfo.userId) {
      const newMessage = {
        id: messages.length + 1, // 예시: 메시지 ID는 서버에서 제공하는 것에 맞춰 수정 필요
        userId: userInfo.userId,
        content: inputText,
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputText('');
    } else {
      console.error('Failed to send message:', inputText);
    }
  };

  const handleSaveEdit = () => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => (msg.id === editingMessageId ? { ...msg, content: editingText } : msg))
    );
    setEditingMessageId(null);
    setEditingText('');
  };

  const handleEdit = (message) => {
    setEditingMessageId(message.id);
    setEditingText(message.content);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onLongPress={() => handleEdit(item)}>
      <View style={[styles.messageContainer, item.userId === userInfo.userId ? styles.messageUser1 : styles.messageUser2]}>
        <Text style={styles.messageText}>{item.username || 'Unknown User'}: {item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userInfo}>Logged in as: {userInfo ? userInfo.email : 'Loading...'}</Text>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => (item.id ? item.id.toString() : '')}
        style={styles.messageList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={editingMessageId ? editingText : inputText}
          onChangeText={editingMessageId ? setEditingText : setInputText}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={editingMessageId ? handleSaveEdit : handleSend}>
          <Text style={styles.sendButtonText}>{editingMessageId ? 'Save' : 'Send'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontSize: 16,
  },
  messageList: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },
  sendButtonText: {
    color: '#fff',
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 4,
  },
  messageUser1: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-start',
  },
  messageUser2: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatRoom;
