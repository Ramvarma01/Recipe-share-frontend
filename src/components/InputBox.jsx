import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const InputBox = ({ title, keyboardType, autoComplete, secureTextEntry }) => {
    return (
        <View>
            <TextInput
                style={styles.inputBox}
                placeholder={title}
                // defaultValue={title}
                // autoCorrect={false}
                keyboardType={keyboardType}
                // autocomplete={autoComplete}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

export default InputBox

const styles = StyleSheet.create({
    inputBox: {
        backgroundColor: '#ffffff',
        height: 40,
        borderRadius: 10,
        marginBottom: 10,
        color: '#2f4f4f',
        paddingLeft: 15,
        fontWeight: 'bold',
    },
})