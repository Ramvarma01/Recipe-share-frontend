import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Logo = ({style}) => {
    return (
        <View style={[styles.logoContainer]}>
            <Image source={require("../assets/logo.png")} style={[styles.logo,style]} />
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: "center",
        // marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
    },
});

export default Logo;