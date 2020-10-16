import React, {useContext, useState, useEffect} from 'react'
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, ToastAndroid,CheckBox, Alert } from 'react-native'
import {ListItem, Card, Button, Icon} from 'react-native-elements'
import { StackActions } from '@react-navigation/native';

import { AsyncStorage } from 'react-native';

//import CurrencyPair from '../../CurrencyPair'
import {firebase} from '../../../firebase/config'
import {CurrencyContext} from '../../../context/Context'
import styles from '../HomeScreen/styles'



function HomeScreen(navigation, props) {

    const currency = useContext(CurrencyContext);
    //hook for the modal
    const [modalopen, setModalOpen] = useState(false)
//hook for the clicked currency pair
    const [clickedindex, setClickedIndex]  = useState(0)
//hook for the actionsheet
const [email, setemail] = useState(false);
const [sms, setSMS] = useState(false)
const [pushNotification, setPushNotification] = useState(false)
//Hooks for the alert inputs
   const [pricealert, setPricealert] = useState('')
   const [alertMessage, setalertMessage] = useState('')

   //hook for alerts array
   const [alertsList, setAlertsList] = useState([])
   const userID = props.extraData.id

// function for posting an alert to firebase
function addAlert() {
  const CurrencyPair =  {...currency.data.prices[clickedindex].instrument}
const timeStamp = firebase.firestore.FieldValue.serverTimestamp()

  firebase.firestore()
  .collection("Alerts")
  .add({
    alert_Message: alertMessage,
    alert_Currency_Pair: CurrencyPair,
    alert_Timestamp: timeStamp, 
    alert_user_id : userID
  })
  .then((data) => addAlert(data))
  .catch((error) => {
    console.log(error)
  })
}




// function for getting alerts from firebase
useEffect(() => {
  firebase.firestore().collection("Alerts")
  .where(" alert_user_id ", "==", userID)
  .orderBy("alert_Timestamp")
  .onSnapshot(querySnapshot=>{

    const AlertEntities = []
    querySnapshot.forEach(doc => {
      const entity = doc.data()
      entity.id = doc.id
      AlertEntities.push(entity)
    })
    setAlertsList(AlertEntities)
  },
  error => {
console.log(error)
  }
  )



},[])
 


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
                  value={pricealert}
                  onChangeText = {(pricealert) => setPricealert(pricealert)}
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
              <View style={styles.checkboxContainer}>
        <CheckBox
          value={sms}
          onValueChange={setSMS}
          style={styles.checkbox}
        />
        <Text>SMS</Text>
        </View>
        <View style={styles.checkboxContainer}>
        <CheckBox
          value={email}
          onValueChange={setemail}
          style={styles.checkbox}
        />
        <Text>Email</Text>
        </View>
        <View style={styles.checkboxContainer}>
        <CheckBox
          value={pushNotification}
          onValueChange={setPushNotification}
          style={styles.checkbox}
        />
        <Text>Push Notification</Text>
        </View>

         
              <TouchableOpacity style={styles.button}
               onPress={() => {
                 if(pricealert.length < 7 || pricealert.length > 7){
                   Alert.alert("Error", "Input a valid price")
                   return ;
                 }
                 if(alertMessage.length === 0)
                 {
                   Alert.alert("Incomplete", "Enter your Alert Message")
                   return ;
                 }
                  addAlert();
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
