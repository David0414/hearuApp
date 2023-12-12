// CommentScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../api/client';

const CommentScreen = ({ route }) => {
  const { postId } = route.params;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const response = await axios.get(`${BASE_URL}/comments/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComments(response.data.message);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentItem}>
      <Text style={styles.commentText}>{item.comment}</Text>
      {/* Puedes mostrar más detalles del comentario según tu estructura de datos */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.commentId.toString()}
        renderItem={renderCommentItem}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  commentItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 16,
    paddingBottom: 8,
  },
  commentText: {
    fontSize: 16,
    color: 'white',
  },
};

export default CommentScreen;
