import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function AlertScreen() {
    return (
      <View style={styles.container}>
          <Text>
              AlertScreen
          </Text>
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }


})

export default AlertScreen
