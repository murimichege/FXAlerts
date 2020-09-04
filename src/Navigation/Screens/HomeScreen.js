import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }


})

export default HomeScreen
