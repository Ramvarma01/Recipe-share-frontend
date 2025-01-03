import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Logout = () => {
    return (
        <View style={styles.logoContainer}>
            <Image source={require("../assets/logout.png")} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: "center",
        // marginBottom: 20,
    },
    logo: {
        width: 30,
        height: 30,
    },
});

export default Logout;