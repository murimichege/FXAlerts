import React from 'react'
import {Text, View} from 'react-native'
import {Card, ListItem, Icon} from 'react-native-elements'
export default function AlertScreen({route}) {

   
    const deleteAlert = () =>{

    }
    return (
        <View>
            { 
            
                <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>
                     
                    </ListItem.Title>
                </ListItem.Content>
                <Icon name="delete" size={20} onPress={() =>delete(deleteAlert())} />
            </ListItem>
            
            }
           
        </View>
    )
}
