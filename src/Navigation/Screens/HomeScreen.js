import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'


const HomeScreen = () =>{ 
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent:"center"
    }


})

export default HomeScreen
