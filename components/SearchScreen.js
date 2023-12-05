import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../api/client';

const SearchScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        console.log('Search Results:', searchResults);

        // Puedes realizar acciones adicionales al cargar la pantalla, si es necesario
    }, []);

    const handleSearch = async (text) => {
        try {
            setSearchText(text);

            if (text.trim() === '') {
                setSearchResults([]);
                return;
            }

            const token = await AsyncStorage.getItem('token');
            const searchResponse = await axios.get(
                `${BASE_URL}/search/${encodeURIComponent(text)}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (searchResponse.data.code === 200) {
                setSearchResults(searchResponse.data.message);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const getItemTitle = (item) => {
        switch (item.descripcion) {
          case 'cancion':
            return item.nombre;
          case 'autor':
            return item.nombre;
          case 'album':
            return item.nombre;
          case 'usuario':
            return item.nombre;
          default:
            return '';
        }
      };
      
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    onChangeText={handleSearch} // Llama a la función de búsqueda en cada cambio de texto
                    value={searchText}
                />
                <Button title="Search" onPress={handleSearch} />
            </View>

            <FlatList
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            console.log('Click on result:', item);
                        }}
                        style={styles.searchResultItem}
                    >
                        <Text style={styles.searchResultText}>{decodeURIComponent(getItemTitle(item))}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'gray',
        borderRadius: 10,
        marginRight: 10,
        padding: 10,
    },
    searchResultItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 10,
    },
    searchResultText: {
        color: 'black', // Cambia el color del texto a negro
    },

});

export default SearchScreen;
