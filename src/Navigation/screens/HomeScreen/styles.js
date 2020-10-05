import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 100,
        alignItems: "center",
        justifyContent: 'center',
        marginRight: 20,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    textInputStyle: {
        borderColor: 'transparent',
        elevation: 1,
        height: 40,
        width: 80,
        justifyContent: "space-between",
        paddingLeft: 15,
        backgroundColor: 'lightgrey',
        padding: 4,
        borderRadius: 5

    
    },
      modal: {
          alignItems: "center"
      },
      inputWrap : {
        borderColor: "#cccccc",
        borderBottomWidth: 1,
        marginBottom: 10
      },

    
})
