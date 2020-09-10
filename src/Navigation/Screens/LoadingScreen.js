import React, {useEffect, useState} from 'react'
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native'
import {firebase} from '../../firebase/config'

const LoadingScreen = ({navigation}) => {

   useEffect(() => {
     checkIfLoggedIn = () =>{
        firebase.auth().onAuthStateChanged(
            user => {
                if(user){
                    navigation.navigate('HomeScreen')
                }else{
                  
                    navigation.navigate('LogInScreen')
                }
            }
        )

     }
            
       
       checkIfLoggedIn() 
    }, [])
    

    
  
    return (
        <View style={styles.container}>
            <Text>
                Load</Text>            
        </View>
        
    );
}



export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
