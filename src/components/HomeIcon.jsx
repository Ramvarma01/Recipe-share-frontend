import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Home = () => {
    return (
        <View style={styles.logoContainer}>
            <Image source={require("../assets/home.png")} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: "center",
        // marginBottom: 20,
    },
    logo: {
        width: 25,
        height: 25,
    },
});

export default Home;
