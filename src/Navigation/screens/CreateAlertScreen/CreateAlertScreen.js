import React, {useRef, useState} from 'react'
import { View, Text,TextInput, StyleSheet, Picker, TouchableOpacity, Button, PushNotificationIOS } from 'react-native'
import {Card, CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import styles from './styles'
import HomeScreen from '../HomeScreen/HomeScreen';
const CreateAlertScreen =({route, navigation, user})=> {

    
// hook for the message textinput
    const [message, setMessage] = useState(null)

    return (
        <View style={styles.container}>
            
             <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
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

                <TextInput
          style={styles.textInputStyle}
          placeholder="Price"
          placeholderTextColor="#60605e"
          numeric
          keyboardType='decimal-pad'	
        />
                <Card.Divider/> 

                <TextInput
                value={message}
                onChangeText={(message) =>setMessage(message)}
                style={styles.input}
                />
                <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AlertScreen', {
                    alert: message
                })}
                >
                    <Text style={styles.buttonTitle}>CreateAlert</Text>
                </TouchableOpacity>
                

            
        </Card>
        </KeyboardAwareScrollView>
        </View>
    )
}

export default CreateAlertScreen

