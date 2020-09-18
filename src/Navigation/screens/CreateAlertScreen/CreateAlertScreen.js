import React, {useState} from 'react'
import { View, Text,TextInput, StyleSheet, Picker } from 'react-native'
import {Card, CheckBox } from 'react-native-elements'
//import {Picker} from '@react-native-community/picker';

const CreateAlertScreen =({route})=> {

    // passed routes as parameters
    const {instrumentname} = route.params
    const {BidPrice} = route.params
    const {AskPrice} = route.params

  

    const [selectedValue, setSelectedValue] = useState("Bid");
    const [notification, setNotification] = useState("email")
    const [message, setMessage] = useState(null)

    return (
        <View>
            <Card>
                <Card.Title>
                    Pair: {instrumentname}
                </Card.Title>
                <Card.Divider/>
                <Text style={{textAlign:"center"}}>
               {BidPrice} / {AskPrice}
                </Text>
                <Card.Divider/>
                <Text style={{textAlign: "center"}}>
                    Alert When : 
                </Text>
                

                <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="bid" value="Bid" />
        <Picker.Item label="ask" value="Ask" />
      </Picker>

                <Card.Divider/>
                <Text style={{textAlign:"center", fontWeight: "bold"}}>
                    Receive Alert via :
                </Text>
                <Picker
                selectedValue={notification}
                onValueChange={(itemValue,itemIndex) => setNotification(itemValue)}
                style={{height: 50, width: 100}}>
                    <Picker.Item  label="SMS" value ="sms"/>
                    <Picker.Item label="Email" value="email"/>
                    <Picker.Item label="Push_Notification" value="pushnotification"/>
                </Picker>

              

        </Card>
        </View>
    )
}

export default CreateAlertScreen

