import React from "react";
import { View, Image, StyleSheet } from "react-native";

const HeaderLogo = () => {
    return (
        <View style={styles.logoContainer}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: "center",
        // marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
    },
});

export default HeaderLogo;