// FooterComponent.js
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterComponent = () => {
  const [selectedIcon, setSelectedIcon] = useState("home");
  const navigation = useNavigation();
  const route = useRoute();


  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName);

    // Navegamos a la pantalla correspondiente
    switch (iconName) {
      case "home":
        navigation.navigate("HomeScreen");
        break;
      case "search":
        navigation.navigate("SearchScreen");
        break;
      case "heart":
        navigation.navigate("FeedScreen"); // Cambiado de "Likes" a "Feed"
        break;
      case "user":
        navigation.navigate('ProfileScreen');
        break;

      case "logOut":
        navigation.navigate("SignIn");
        break;


      default:
        break;
    }
  };

  // Función para obtener el color de fondo según la pantalla actual
  const getIconBackgroundColor = (iconName) => {
    const currentScreen = route.name;
    return selectedIcon === iconName ? "red" : "transparent";
  };


  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        {/* Icono de Home */}
        <TouchableOpacity
          style={[
            styles.iconContainer,
            { backgroundColor: getIconBackgroundColor("home") },
          ]}
          onPress={() => handleIconPress("home")}
        >
          <Image
            source={require('../assets/icons/hogar.png')} // Ruta de la imagen PNG
            style={styles.iconImage}
          />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>

        {/* Icono de Buscar */}
        <TouchableOpacity
          style={[
            styles.iconContainer,
            { backgroundColor: getIconBackgroundColor("search") },
          ]}
          onPress={() => handleIconPress("search")}
        >
          <Image
            source={require('../assets/icons/lupa.png')} // Ruta de la imagen PNG
            style={styles.iconImage}
          />
          <Text style={styles.iconText}>Buscar</Text>
        </TouchableOpacity>

        {/* Icono de Feed */}
        <TouchableOpacity
          style={[
            styles.iconContainer,
            { backgroundColor: getIconBackgroundColor("heart") },
          ]}
          onPress={() => handleIconPress("heart")}
        >
          <View>
            <Image
              source={require('../assets/icons/amigos.png')} // Ruta de la imagen PNG
              style={styles.iconImage}
            />
            <Text style={styles.iconText}>Amigos</Text>
          </View>
        </TouchableOpacity>

        {/* Icono de Perfil */}
        <TouchableOpacity
          style={[
            styles.iconContainer,
            { backgroundColor: getIconBackgroundColor("user") },
          ]}
          onPress={() => handleIconPress("user")}
        >
          <Image
            source={require('../assets/icons/usuario-de-perfil.png')} // Ruta de la imagen PNG
            style={styles.iconImage}
          />
          <Text style={styles.iconText}>Perfil</Text>
        </TouchableOpacity>


        {/*Icono de Log out*/}

        <TouchableOpacity
          style={[
            styles.iconContainer,
            { backgroundColor: getIconBackgroundColor("logOut") },
          ]}
          onPress={() => handleIconPress("logOut")}
        >
          <Image
            source={require('../assets/icons/cerrar-sesion.png')} // Ruta de la imagen PNG
            style={styles.iconImage}
          />
          <Text style={styles.iconText}>Log Out</Text>
        </TouchableOpacity>


      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#525252",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#464646",
    width: "105%",
    position: "absolute",
    bottom: 0,
    borderRadius: 20,
    alignItems: "center",  // Agregado para centrar verticalmente

  },
  iconContainer: {
    alignItems: "center",
  },

  iconImage: {
    width: 24, // ajusta el ancho según tus necesidades
    height: 24, // ajusta la altura según tus necesidades
  },

  iconText: {
    marginTop: 5,
    color: "black",
  },
  selectedIcon: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 5,
  },

  footer: {
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    color: 'white',
    fontSize: 14,
  },


});

export default FooterComponent;