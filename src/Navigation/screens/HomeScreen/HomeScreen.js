import React, {useContext, useState, useEffect} from 'react'
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, ToastAndroid,CheckBox, Alert } from 'react-native'
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

//Hooks for the alert inputs
   const [alertPrice, setAlertPrice] = useState('')
   const [alertMessage, setalertMessage] = useState('')
   //Hook for storng the price alerts
   const [alerts, setAlerts] = useState([])

// function for posting an alert to firebase
function addAlert() {
  let askPrice = ([...currency.data.prices[clickedindex].closeoutAsk].join('').toString())
  let bidPrice =( [...currency.data.prices[clickedindex].closeoutBid].join('').toString())
  let CurrencyPair =  ([...currency.data.prices[clickedindex].instrument].join('').toString())
let timeStamp = firebase.firestore.FieldValue.serverTimestamp()
let newDocRef = firebase.firestore().collection("Alerts").doc()

const userId = firebase.auth().currentUser.uid
  newDocRef.set({
    alert_id: newDocRef.id,
    
    alert_User_id : userId,
    alert_Current_AskPrice: askPrice,
    alert_Current_BidPrice: bidPrice,
    alert_Message: alertMessage,
    alert_Currency_Pair:CurrencyPair,
    alert_Timestamp: timeStamp,
    alert_Price: alertPrice
  })

  .catch((error) => {
    console.log(error)
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


  useEffect (() => {
    const interval = setInterval(() => {
      const checkCondition = (alertPrice) =>  {
      const MarketPrice = (askPrice + bidPrice )/2
      let askPrice = ([...currency.data.prices[clickedindex].closeoutAsk].join('').toString())
      let bidPrice =( [...currency.data.prices[clickedindex].closeoutBid].join('').toString())
      let CurrencyPair =  ([...currency.data.prices[clickedindex].instrument].join('').toString())
        /*alerts.forEach(pricea => {
          
          
        });*/
        console.log(alerts)
        
        }

checkCondition
    }, 1000)
  },[])
   

  
  
  
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
                  value={alertPrice}
                  onChangeText = {(alertPrice) => setAlertPrice(alertPrice)}
                  placeholder="Alert Price"
                  placeholderTextColor="#60605e"
                  numeric
                  keyboardType='decimal-pad'	
                />


                  <TextInput
                  style={styles.messageStyle}
                  value={alertMessage}
                  onChangeText = {(alertMessage) => setalertMessage(alertMessage)}
                  placeholder="Alert Message"
                  placeholderTextColor="#60605e"
                />
                </View>
                <View style={styles.inputWrap}>
                  </View>
              </View>   
        

         
              <TouchableOpacity style={styles.button}
               onPress={() => {
                 if(alertPrice.length < 7 || alertPrice.length > 7){
                   Alert.alert("Error", "Input a valid price")
                   return ;
                 }
                 if(alertMessage.length === 0)
                 {
                   Alert.alert("Incomplete", "Enter your Alert Message")
                   return ;
                 }
                  addAlert();
                  alerts.push({alertPrice})
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
