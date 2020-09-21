import React from 'react'
import {Text, View} from 'react-native'
import {Card} from 'react-native-elements'
export default function AlertScreen({route}) {

    const {alert} = route.params
    return (
        <View>
           <Card>
               <Text>
                   {alert}
               </Text>

           </Card>
        </View>
    )
}
