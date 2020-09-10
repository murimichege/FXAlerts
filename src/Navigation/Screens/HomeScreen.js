import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import {firebase} from '../../firebase/config'

function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
        <Text> Profile Screen </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Welcome
        </Text>
        <Button
        title="Create an alert"
        onPress={() => navigation.navigate('CreateAlertScreen')}/>
       
      </View>
        
    )
}
export default HomeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }


})
