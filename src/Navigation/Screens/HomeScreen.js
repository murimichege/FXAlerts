import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import CreateAlert from '../Screens/CreateAlertScreen'


function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
            <Button title ="Create Alert" onPress={() => navigation.navigate(CreateAlert)}/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }


})

export default Home
