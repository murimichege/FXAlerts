import React, {useContext, useState, useEffect} from 'react'
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, ToastAndroid, Alert,Picker } from 'react-native'
import {ListItem, Card, Button} from 'react-native-elements'
import { StackActions } from '@react-navigation/native';


//import CurrencyPair from '../../CurrencyPair'
import {firebase} from '../../../firebase/config'
import {CurrencyContext} from '../../../context/Context'
import styles from '../HomeScreen/styles'
// import for the Buy and Sell Threshold
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



function HomeScreen({navigation}) {

    const currency = useContext(CurrencyContext);
    //hook for the modal
    const [modalopen, setModalOpen] = useState(false)
//hook for the clicked currency pair
    const [clickedindex, setClickedIndex]  = useState(0)

    const [selectedValue, setSelectedValue] = useState(
      "BuyPrice"
    );

//Hooks for the price Threshold text inputs
   const [BuyThreshhold, setBuyThreshhold] = useState('')
   const [SellThreshhold, setSellThreshhold] = useState('')
   const [SMSMessage, setSMSMessage] = useState('')
   //Hook for storng the price alerts
   const [alerts, setAlerts] = useState([])

 
  function createAlert(){
    try {
      // adding of a currency pair to the db and referecing the api collection to the CURRENCY-PAIR COLLECTION
      let askPrice = ([...currency.data.prices[clickedindex].closeoutAsk].join('').toString())
      let bidPrice =( [...currency.data.prices[clickedindex].closeoutBid].join('').toString())
      let CurrencyPair =  ([...currency.data.prices[clickedindex].instrument].join('').toString())
      const CurrencyPairDoc = firebase.firestore().collection("CURRENCY_PAIR").doc()
      const APIDoc = firebase.firestore().collection("API").doc('sqBmmzATV1vHPC71XHKv')
      firebase.firestore().collection("CURRENCY_PAIR")
      .where("Currency_API_Id", '==',APIDoc)
      .get()
      CurrencyPairDoc.set({
        CurrencyPair_id: CurrencyPairDoc.id,
        CurrencyPair_Name: CurrencyPair,
        Currency_AskPrice: askPrice,
        Currency_BidPrice: bidPrice,
        Currency_API_Id: APIDoc
      })
      
    
      // adding limit to the currency pair  collection and referencing the currency pair selected to it
      const LimitDoc = firebase.firestore().collection("CURRENCY_PAIR_LIMITS").doc() 
      const CurrencyPairDocRef  = firebase.firestore().collection('CURRENCY_PAIRS').doc(CurrencyPairDoc)
       firebase.firestore().collection("CURRENCY_PAIR_LIMIT")
        .where("Limit_Currency_Pair_Id", "==", CurrencyPairDocRef)
        .get()
        
        LimitDoc.set({
          Limit_id: LimitDoc.id,
          Limit_Currenct_Pair_Id: CurrencyPairDocRef.id,   // make a document reference to this field
          Limit_Buy_Price_Threshhold :  BuyThreshhold,
          Limit_Sell_Price_Threshhold:  SellThreshhold
    
        })
        // adding the created sms message to be sent to the user when the alert is triggered to the db
      const SMSDoc = firebase.firestore().collection("SMS").doc()
      let Message = SMSMessage
      SMSDoc.set({
        SMS_Id: SMSDoc.id,
        SMS_Message: Message
      }) 
    
      // adding the alert to the alert collection while referencing the document to be used in the USERS, SMS and Limit
      let timeStamp = firebase.firestore.FieldValue.serverTimestamp()
      let AlertsDoc = firebase.firestore().collection("Alerts").doc()
      const userId = firebase.auth().currentUser.uid
    
     const SMSDocref = firebase.firestore().collection('SMS').doc(SMSDoc)
      firebase.firestore().collection("ALERTS")
      .where("Alert_SMS_Id", "==", SMSDocref)
      .get()
     const LimitDocref = firebase.firestore().collection("CURRENCY_PAIR_LIMITS").doc(LimitDoc)
     firebase.firestore().collection("ALERTS")
     .where("Alert_Limit_Id", "==", LimitDocref)
     .get()
      
    
      AlertsDoc.set({
        Alert_id: AlertsDoc.id,
        Alert_Timestamp: timeStamp,
        Alert_Status: false,
        Alert_User_id : userId,
        Alert_SMS_Id: SMSDocref.id,
        Alert_Limit_Id:LimitDocref.id
        
      })    
    } catch (error) {
      console.log(error)
    }
   


  }




/* async function logOut() {
   try {
    await firebase.auth().signOut();
    navigation.dispatch(
      StackActions.popToTop()
    );   
   } catch (error) {
     console.log(error)
   }
  }*/

function checkCondition({BuyThreshold, SellThreshold, SMSMessage}) {
  let BuyingPrice = [...currency.data.prices[clickedindex].closeoutAsk]
  let SellingPrice = [...currency.data.prices[clickedindex].closeoutBid]
  let currencypair = [...currency.data.prices[clickedindex].instrument]
  let BuyThreshholdarray = []
  let SellThreshholdarray = []

  

  
  BuyThreshholdarray.push(...BuyThreshold, currencypair)
  BuyThreshholdarray.forEach((element, index) => {
    console.log(element, index)

  })
  SellThreshholdarray.push(...SellThreshold, currencypair)
 
  
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
        <KeyboardAwareScrollView >
          <Modal
          visible={modalopen}
          transparent={true}
          animationType={"fade"}
          >
            <View style={{flex: 1, backgroundColor: '#000000aa'}}>
              <View style={{margin: 10, backgroundColor: '#ffffff', padding: 30,flex: 1, borderRadius: 10}}>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>
                  Create Alert On: 
                </Text>
                               
                <Text style={{textAlign: "center", fontWeight: "bold"}}>
               {currency.data.prices[clickedindex].instrument}
              </Text>
              <Text style={{textAlign: "center"}}>
              {currency.data.prices[clickedindex].closeoutAsk}/{currency.data.prices[clickedindex].closeoutBid}
              </Text>
              
              <Card.Divider/>

              <View>
                <View style={{justifyContent: "center"}}>
                <Picker
                  mode= "dropdown"
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>setSelectedValue(itemValue) }
          >
            <Picker.Item label="BuyPrice" value="BuyPrice" /> 
            <Picker.Item label="SellPrice" value="SellPrice" />
            
          </Picker>

                </View>
              
          {
            selectedValue === "BuyPrice" ? 
            <TextInput
                  style={styles.textInputStyle}
                  value={BuyThreshhold}
                  onChangeText = {(BuyThreshhold) => setBuyThreshhold(BuyThreshhold)}
                  placeholder="BuyThreshhold"
                  placeholderTextColor="#60605e"
                  numeric
                  clearButtonMode='always'
                  keyboardType='decimal-pad'	
                /> : 
                <TextInput
                  style={styles.textInputStyle}
                  value={SellThreshhold}
                  onChangeText = {(SellThreshhold) => setSellThreshhold(SellThreshhold)}
                  placeholder="Sell Threshhold"
                  placeholderTextColor="#60605e"
                  numeric
                  clearButtonMode='always'
                  keyboardType='decimal-pad'	
                />
             

          }
              </View>
             
              <View style={{ flexDirection: "row", justifyContent:"center" }}>
              
                <View style={styles.inputWrap}>
                  <TextInput
                  style={styles.messageStyle}
                  value={SMSMessage}
                  onChangeText = {(SMSMessage) => setSMSMessage(SMSMessage)}
                  placeholder="Message"
                  clearButtonMode='always'

                  placeholderTextColor="#60605e"
                />

                </View>
              </View>  

                
                 

              
              
              <View style={{flexDirection: "row", justifyContent: "center"}}>
                <View>
                <TouchableOpacity style={styles.button}
               onPress={() => {
                 
                 if(SMSMessage.length === 0)
                 {
                   Alert.alert("Incomplete", "Enter your Alert Message")
                   return ;
                 }
                  createAlert();
                  setModalOpen(false);
                  showToastWithGravityAndOffset();} }
                  >
                   <Text style={styles.buttonTitle}>OK</Text>
              </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity style={styles.button} onPress ={() => setModalOpen(false)}>
                    <Text>Close</Text>
                  </TouchableOpacity>

                </View>
                </View>  


         
              
             
             
             
              </View>
            </View>
          </Modal>
        <Card>
            <Text style={{textAlign: "center"}}>
                Welcome
            </Text>
            <Button title="Sign Out" type="outline" />
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
    </KeyboardAwareScrollView>
)
}
export default HomeScreen
