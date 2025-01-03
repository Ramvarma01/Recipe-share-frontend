import { StyleSheet } from "react-native"

const styles = StyleSheet.create({

    //Register and Login
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#deb887'
    },
    pageTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2f4f4f',
        // marginBottom: 5,
    },
    inputBox: {
        backgroundColor: '#ffffff',
        height: 40,
        borderRadius: 10,
        marginVertical: 5,
        color: '#2f4f4f',
        paddingLeft: 15,
        fontWeight: 'bold',
    },
    forgotPassword: {
        textAlign: 'right',
        color: '#b22222',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    btn: {
        backgroundColor: '#2f4f4f',
        height: 40,
        borderRadius: 2,
        justifyContent: 'center',
        marginVertical: 5,
    },
    btnText: {
        color: '#ffffff',
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 16,
    },
    linkText: {
        textAlign: 'center',
        marginVertical: 5,
    },
    innerLinkText: {
        color: '#b22222',
        fontWeight: 'bold',
    },
    validityText: {
        color: '#b22222',
        marginLeft: 5,
        fontWeight: '450',
    },
})

export default styles