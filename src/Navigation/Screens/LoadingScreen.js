import React, {useEffect} from 'react'
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native'
import firebase from 'firebase'



const LoadingScreen = ({navigation}) => {

    useEffect(() =>{
        firebase.auth().onAuthStateChanged(
            user => {
                if(user){
                    navigation.navigate('HomeScreen')
                }
                else{
                    navigation.navigate('LogInScreen')
                }
            }
        )
    },[])

    /*const checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(
           function(user) {
                if(user){
                    props.navigation.navigate('HomeScreen');

                }
                else{
                    props.navigation.navigate('LogInScreen');
                }
            }
        )
    }*/
    return (
        <View style={styles.container}>
            <Text>
                <ActivityIndicator size="large"/>
            </Text>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default LoadingScreen
