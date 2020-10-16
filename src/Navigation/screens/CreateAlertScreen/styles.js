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
        justifyContent: "center",
    

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
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      }
})
