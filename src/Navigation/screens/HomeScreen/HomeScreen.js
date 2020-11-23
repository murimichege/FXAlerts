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
// context instance
    const currency = useContext(CurrencyContext);
    //hook for the modal
    const [modalopen, setModalOpen] = useState(false)
//hook for the clicked currency pair
    const [clickedindex, setClickedIndex]  = useState(0)

    const [selectedValue, setSelectedValue] = useState(
      "BuyPrice"
    );

//Hooks for the price Threshold text inputs
   const [BuyThreshold, setBuyThreshhold] = useState('')
   const [SellThreshold, setSellThreshhold] = useState('')
   const [SMSMessage, setSMSMessage] = useState('')


// START OF FUNCTION DEFINITIONS
  function addAlerttoDB(){
    try {
      // adding of a currency pair to the db and referecing the api collection to the CURRENCY-PAIR COLLECTION
      let askPrice = ([...currency.data.prices[clickedindex].closeoutAsk].join('').toString())
      let bidPrice =([...currency.data.prices[clickedindex].closeoutBid].join('').toString())
      let CurrencyPair =  ([...currency.data.prices[clickedindex].instrument].join('').toString())
      const CurrencyPairDoc = firebase.firestore().collection("CURRENCY_PAIR").doc()
      const APIDocRef = firebase.firestore().collection("API").doc('sqBmmzATV1vHPC71XHKv')
      firebase.firestore().collection("CURRENCY_PAIR")
      .where("Currency_API_Id",'==',APIDocRef)
      .get()
      CurrencyPairDoc.set({
        CurrencyPair_id: CurrencyPairDoc.id,
        CurrencyPair_Name: CurrencyPair,
        Currency_AskPrice: askPrice,
        Currency_BidPrice: bidPrice,
        Currency_API_Id: APIDocRef
      })
      // adding limit to the currency pair  collection and referencing the currency pair selected to it
      const LimitDoc = firebase.firestore().collection("CURRENCY_PAIR_LIMIT").doc() 
      const CurrencyPairDocRef  = firebase.firestore().collection('CURRENCY_PAIR').doc(CurrencyPairDoc.id)
       firebase.firestore().collection("CURRENCY_PAIR_LIMIT")
        .where("Limit_Currency_Pair_Id", "==", CurrencyPairDocRef)
        .get()
        
        LimitDoc.set({
          Limit_id: LimitDoc.id,
          Limit_Currenct_Pair_Id: CurrencyPairDocRef,   // make a document reference to this field
          Limit_Buy_Price_Threshhold :  BuyThreshold,
          Limit_Sell_Price_Threshhold:  SellThreshold
    
        })
        // adding the created sms message to be sent to the user when the alert is triggered to the db
      const SMSDoc = firebase.firestore().collection("SMS").doc()
      let Message = SMSMessage
      SMSDoc.set({
        SMS_Id: SMSDoc.id,
        SMS_Message: Message
      }) 
    
      // adding the alert to the alert collection while referencing the document to be used in the USERS, SMS and Limit
      const timeStamp = firebase.firestore.FieldValue.serverTimestamp()
      let AlertsDoc = firebase.firestore().collection("Alerts").doc()
      const userId = firebase.auth().currentUser.uid
    
     const SMSDocref = firebase.firestore().collection('SMS').doc(SMSDoc.id)
      firebase.firestore().collection("ALERTS")
      .where("Alert_SMS_Id", "==", SMSDocref)
      .get()
     const LimitDocref = firebase.firestore().collection("CURRENCY_PAIR_LIMITS").doc(LimitDoc.id)

     firebase.firestore().collection("ALERTS")
     .where("Alert_Limit_Id", "==", LimitDocref)
     .get()
      
    
      AlertsDoc.set({
        Alert_id: AlertsDoc.id,
        Alert_Timestamp: timeStamp,
        Alert_Status: false,
        Alert_User_id : userId,
        Alert_SMS_Id: SMSDocref,
        Alert_Limit_Id:LimitDocref
        
      })    
    } catch (error) {
      console.log(error)
    }
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
 useEffect(() => )
 function checkCondition({BuyThreshold, SellThreshold,SMSMessage}) {
    const SelectedCurrencyPair = [currency.data.prices[clickedindex].instrument]
    const Buy = SelectedCurrencyPair.concat(BuyThreshold)
    const thresholdArray = []
    thresholdArray.push(Buy)
   
     
       // console.log([{...value.instrument},{...value.closeoutAsk},{...value.closeoutBid}])
     {
        Object.values(currency.data.prices)
        .map((value) => (
          console.log([value.instrument,value.closeoutAsk,value.closeoutBid])
         
        )); 
        
        } /* setInterval(() => {
        for (let index = 0; index < result.length; index++) {
          console.log(result[index])
           for (let index = 0; index < thresholdArray.length; index++) {
  
           console.log(thresholdArray[index])
           if(result[index][1] >= thresholdArray[1] && (thresholdArray[0]) == result[index][0])
           {
             Alert.alert(SMSMessage)
             //create a reference of the limitcollection
             let AlertsDoc = firebase.firestore().collection("Alerts").doc()
     
             firebase.firestore().collection("CURRENCY_PAIR_LIMITS").doc()
             .where(" Limit_Buy_Price_Threshhold", "==", BuyThreshold)
             
             
             AlertsDoc.update({
               Alert_Status: true
             })
             return true;
        
             } 
            //where the Limit-Buythreshold is equal to the thresholdArray[1]
             //change update the alert status in the db to be true
             // filter the currencypair and the respective buythreshold if the condition is met
     
           }
        
         }
         
       }, 1000);
       */
     
}
  
    //toast function that will be called when the ok button is clicked
   function showToastWithGravityAndOffset(){
      ToastAndroid.showWithGravityAndOffset(
        "Alert created successfully",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    };
  // END OF FUNCTION DEFINITIONS
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
                  <>
               {currency.data.prices[clickedindex].instrument}
               </>
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
                  value={BuyThreshold}
                  onChangeText = {(BuyThreshold) => setBuyThreshhold(BuyThreshold)}
                  placeholder="BuyThreshhold"
                  placeholderTextColor="#60605e"
                  numeric
                  clearButtonMode='always'
                  keyboardType='decimal-pad'	
                /> : 
                <TextInput
                  style={styles.textInputStyle}
                  value={SellThreshold}
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
               
                
      
                 addAlerttoDB();
              // checkCondition({BuyThreshold, SellThreshold, SMSMessage});
                  
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
            <Button title="Sign Out" type="outline" onPress = {() => logOut()} />
            <Button title="My Alerts"  onPress ={() => navigation.navigate("AlertScreen") }/>
            
        </Card>

        <View>
          
            {
            // Mapping of the actual currency pairs and their ask and bid prices respectively
            currency.data.prices && currency.data.prices.map((item, index) => {
                return (
      <ListItem
        key={index}
        onPress = {() => {setModalOpen(true);setClickedIndex(index); }} 
        bottomDivider>
        <ListItem.Content>
            <ListItem.Title>
            {item.instrument}       {item.closeoutAsk}        {item.closeoutBid}
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