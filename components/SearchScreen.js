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

import FastImage from 'react-native-fast-image';


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

    const getItemDetails = (item) => {
        let title = '';
        let subtitle = '';
        let description = '';
        let photo = '';

        switch (item.descripcion) {
            case 'cancion':
                title = item.nombre;
                subtitle = 'Canción';
                description = `Artista: ${item.autor}`;
                photo = { uri: `asset:/imgs/cover/${encodeURIComponent(item.foto)}` };
                break;
            case 'autor':
                title = item.nombre;
                subtitle = 'Artista';
                description = 'Autor';
                photo = { uri: `asset:/imgs/artist/${encodeURIComponent(item.foto)}` };
                break;
            case 'album':
                title = item.nombre;
                subtitle = 'Álbum';
                description = `Artista: ${item.autor}`;
                photo = { uri: `asset:/imgs/cover/${encodeURIComponent(item.foto)}` };
                break;
            case 'usuario':
                title = item.nombre;
                subtitle = 'Usuario';
                description = `Likes: ${item.likeness}`;
                photo = { uri: `asset:/imgs/profilePic/${encodeURIComponent(item.foto)}` };
                break;
            default:
                break;
        }

        return {
            title,
            subtitle,
            description,
            photo,
        };
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
                            console.log(getItemDetails(item).photo);

                            navigation.navigate('SongScreen', { idCancion: item.id });

                        }}
                        style={styles.searchResultItem}
                    >
                        <Text style={styles.searchResultText}>{decodeURIComponent(getItemDetails(item).title)}</Text>
                        <Text style={styles.searchResultSubtitle}>{getItemDetails(item).subtitle}</Text>
                        <Text style={styles.searchResultDescription}>{getItemDetails(item).description}</Text>
                        {getItemDetails(item).photo && (
                            <FastImage
                                source={getItemDetails(item).photo}
                                style={styles.searchResultPhoto}
                            />
                        )}
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
