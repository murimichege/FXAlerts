import React from 'react'
import { View } from 'react-native'

function CreateAlertScreen() {
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
export default CreateAlertScreen
