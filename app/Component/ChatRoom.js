import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import WebSocketService from '../services/WebSocketService';

const ChatRoom = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editingText, setEditingText] = useState('');

    useEffect(() => {
        fetchUserInfo();
        return () => {
            WebSocketService.disconnect();
        };
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/user/info', {
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setUserInfo(result.data);

            const chatRoomId = result.data.userId;
            WebSocketService.connect(chatRoomId);
            WebSocketService.addCallbacks(onMessageReceived);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const onMessageReceived = (message) => {
        const parsedMessage = JSON.parse(message.data);
        setMessages((prevMessages) => [...prevMessages, parsedMessage]);
    };

    const handleSend = () => {
        if (inputText.trim() && userInfo) {
            const newMessage = {
                userId: userInfo.userId,
                message: inputText,
                chatRoomId: userInfo.userId,
            };
            WebSocketService.sendMessage(newMessage);
            setInputText('');
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

    if (!userInfo) {
        return <Text>Loading user info...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.userInfo}>Logged in as: {userInfo.email}</Text>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.messageList}
            />
            {editingMessageId ? (
                <View style={styles.editContainer}>
                    <TextInput
                        style={styles.input}
                        value={editingText}
                        onChangeText={setEditingText}
                        placeholder="Edit your message"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSaveEdit}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Enter your message"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSend}>
                        <Text style={styles.buttonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    userInfo: {
        marginBottom: 10,
    },
    messageList: {
        flex: 1,
    },
    messageContainer: {
        padding: 10,
        marginBottom: 5,
        borderRadius: 5,
    },
    messageUser1: {
        alignSelf: 'flex-end',
        backgroundColor: '#d1e7dd',
    },
    messageUser2: {
        alignSelf: 'flex-start',
        backgroundColor: '#f8d7da',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default ChatRoom;
