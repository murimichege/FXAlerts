import React from 'react'
import { View , StyleSheet, Text} from 'react-native'

function CreateAlertScreen() {
    return (
       < View style={styles.container}>
            <Text>CreateAlertScreen</Text>
        </View>
    )
}

export default CreateAlertScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }


})