import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "stretch"
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center',

    },
    input: {
        height: 100,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: "lightgrey",
        marginTop: 30,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    buttonTitle: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    textInputStyle: {
        width: 280,
        backgroundColor: 'lightgrey',
        padding: 4,
        borderRadius: 5
      },
})
