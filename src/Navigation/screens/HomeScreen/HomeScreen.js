import React, {useContext, useState, useEffect} from 'react'
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, ToastAndroid, Alert } from 'react-native'
import {ListItem, Card, Button, Icon} from 'react-native-elements'
import { StackActions } from '@react-navigation/native';

import { AsyncStorage } from 'react-native';

//import CurrencyPair from '../../CurrencyPair'
import {firebase} from '../../../firebase/config'
import {CurrencyContext} from '../../../context/Context'
import styles from '../HomeScreen/styles'



function HomeScreen({navigation}) {

    const currency = useContext(CurrencyContext);
    //hook for the modal
    const [modalopen, setModalOpen] = useState(false)
//hook for the clicked currency pair
    const [clickedindex, setClickedIndex]  = useState(0)

//Hooks for the price Threshold
   const [BuyThreshhold, setBuyThreshhold] = useState('')
   const [SellThreshhold, setSellThreshhold] = useState('')

   const [SMSMessage, setSMSMessage] = useState('')
   //Hook for storng the price alerts
   const [alerts, setAlerts] = useState([])

// function for posting an alert to firebase
function addAlert() {
  
let timeStamp = firebase.firestore.FieldValue.serverTimestamp()
let newDocRef = firebase.firestore().collection("Alerts").doc()
const userId = firebase.auth().currentUser.uid

const SMSref = firebase.firestore().collection('SMS').doc()


  newDocRef.set({
    Alert_id: newDocRef.id,
    Alert_User_id : userId,
    alert_Timestamp: timeStamp,
    Alert_SMS_Id: SMSref.id,
    Alert_Limit_Id: Limit_id
    
  })
  .catch((error) => {
    console.log(error)
  })
}

function addSMS(){
  const SMSDoc = firebase.firestore().collection("SMS").doc()
  let Message = SMSMessage
  SMSDoc.set({
    SMS_Id: SMSDoc.id,
    SMS_Message: Message
  }) 
}



 async function logOut() {
   try {
    await firebase.auth().signOut();
    navigation.dispatch(
      StackActions.popToTop()
    );   
   } catch (error) {
     console.log(error)
   }
  }


      
 
    //toast method that will be called when the ok button is clicked
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
                <Icon name="close" onPress={() =>setModalOpen(false)} />                
                <Text style={{textAlign: "center", fontWeight: "bold"}}>
               {currency.data.prices[clickedindex].instrument}
              </Text>
              <Text style={{textAlign: "center"}}>
              {currency.data.prices[clickedindex].closeoutAsk}/{currency.data.prices[clickedindex].closeoutBid}
              </Text>
              
              <Card.Divider/>

              <View style={{ flexDirection: "row"}}>
                <View style={styles.inputWrap}>

                  <TextInput
                  style={styles.textInputStyle}
                  value={BuyThreshhold}
                  onChangeText = {(BuyThreshhold) => setBuyThreshhold(BuyThreshhold)}
                  placeholder="BuyThreshhold"
                  placeholderTextColor="#60605e"
                  numeric
                  keyboardType='decimal-pad'	
                />
                 <TextInput
                  style={styles.textInputStyle}
                  value={SellThreshhold}
                  onChangeText = {(SellThreshhold) => setSellThreshhold(SellThreshhold)}
                  placeholder="Sell Threshhold"
                  placeholderTextColor="#60605e"
                  numeric
                  keyboardType='decimal-pad'	
                />


                  <TextInput
                  style={styles.messageStyle}
                  value={SMSMessage}
                  onChangeText = {(SMSMessage) => setSMSMessage(SMSMessage)}
                  placeholder="Alert Message"
                  placeholderTextColor="#60605e"
                />
                </View>
                <View style={styles.inputWrap}>
                  </View>
              </View>   
        

         
              <TouchableOpacity style={styles.button}
               onPress={() => {
                 
                 if(SMSMessage.length === 0)
                 {
                   Alert.alert("Incomplete", "Enter your Alert Message")
                   return ;
                 }
                 // addAlert();
                  
                
                  //checkCondition(alertPrice)
                  setModalOpen(false);
                  showToastWithGravityAndOffset();} }
                  >
                   <Text style={styles.buttonTitle}>OK</Text>
                   
              </TouchableOpacity>
             
              </View>
            </View>
          </Modal>
        <Card>
            <Text style={{textAlign: "center"}}>
                Welcome
            </Text>
            <Button title="Sign Out" type="outline" onPress ={() => logOut()}/>
            <Button title="My Alerts"  onPress ={() =>navigation.navigate("AlertScreen") }/>
            
        </Card>

        <View>
          
            {
            // Mapping of the actual currency pairs and their ask and bid prices respectively
            currency.data.prices && currency.data.prices.map((prices, index) => {
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
