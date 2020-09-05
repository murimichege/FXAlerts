import React from 'react'
import { View , StyleSheet, Text} from 'react-native'

function CreateAlert() {
    return (
       < View style={styles.container}>
            <Text>CreateAlertScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }


})
export default CreateAlert
