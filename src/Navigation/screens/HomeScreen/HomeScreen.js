import React, {useContext, useState} from 'react'
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, ToastAndroid, Picker } from 'react-native'
import {ListItem, Card, Button, Icon} from 'react-native-elements'
import {ActionSheet} from 'native-base'
//import CurrencyPair from '../../CurrencyPair'
import {firebase} from '../../../firebase/config'
import {CurrencyContext} from '../../../context/Context'
import styles from '../HomeScreen/styles'

var BUTTONS = [
  { text: "SMS", icon: "chatboxes", iconColor: "#2c8ef4" },
  { text: "Email", icon: "analytics", iconColor: "#f42ced" },
  { text: "Push Notification", icon: "aperture", iconColor: "#ea943b" },
  { text: "Delete", icon: "trash", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

function HomeScreen({navigation, props}) {

    const currency = useContext(CurrencyContext);
    const [modalopen, setModalOpen] = useState(false)
    const [clickedindex, setClickedIndex]  = useState(0)
   const[sheet, setSheet] = useState(null)

    //toast method that will be called when the ok button is called
    const showToastWithGravityAndOffset = () => {
      ToastAndroid.showWithGravityAndOffset(
        "Alert created successfully",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    };
return (
        <ScrollView>
          <Modal
          visible={modalopen}
          animationType={"fade"}
          >
            <View style={styles.modal}>
              <View>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>
               {currency.data.prices[clickedindex].instrument}
              </Text>
              <Text style={{textAlign: "center"}}>
              {currency.data.prices[clickedindex].closeoutAsk}/{currency.data.prices[clickedindex].closeoutBid}
              </Text>
              <Card.Divider/>

              <View style={{ flexDirection: "row"}}>
                <View style={styles.inputWrap}>
                <Text>
                      AskPrice
                    </Text>
                    <TextInput
          style={styles.textInputStyle}
          placeholder="Price"
          placeholderTextColor="#60605e"
          numeric
          keyboardType='decimal-pad'	
        />
                </View>
                <View style={styles.inputWrap}>
                <Text>
          Bid Price
        </Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Price"
          placeholderTextColor="#60605e"
          numeric
          keyboardType='decimal-pad'	
        />


                </View>

              </View>
             
                    

       
                
          <TouchableOpacity 
          onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "How do you want to receive your notification"
              },
              buttonIndex => {
                setSheet({ clicked: BUTTONS[buttonIndex] });
              }
            )}
            style={styles.button}
          >
            <Text>ActionSheet</Text>
          </TouchableOpacity>





                   
              <TouchableOpacity style={styles.button}
               onPress={() => {setModalOpen(false);showToastWithGravityAndOffset();} }>
                <Text style={styles.buttonTitle}>OK</Text>
              </TouchableOpacity>
              </View>
            </View>
          </Modal>
        <Card>
            <Text style={{textAlign: "center"}}>
                Welcome
            </Text>
            <Button title="Sign Out" type="outline" onPress ={() => firebase.auth().signOut()}/>
            <Button title="My Alerts"  onPress ={() =>navigation.navigate("AlertScreen") }/>
            
        </Card>

        <View>
            {currency.data.prices && currency.data.prices.map((prices, index) => {
                return (
      <ListItem
        key={index}
        onPress = {() => {setModalOpen(true);setClickedIndex(index);}} 
        bottomDivider>
        <ListItem.Content>
            <ListItem.Title>
              
            {currency.data.prices[index].instrument}        {currency.data.prices[index].closeoutAsk}         {currency.data.prices[index].closeoutBid}
            </ListItem.Title>
        </ListItem.Content>
      </ListItem>     
                )
            })
}
        </View>
   
    </ScrollView>
)
}
export default HomeScreen
