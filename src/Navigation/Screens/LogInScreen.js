import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
function LogIn() {
    return (
        <View style={styles.container}>
            <Text>LogInScreen</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }


})

export default LogIn
