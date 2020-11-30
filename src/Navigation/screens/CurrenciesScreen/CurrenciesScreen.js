import React, {useContext, useState, useEffect, useLayoutEffect} from 'react'
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, ToastAndroid, Alert,Picker } from 'react-native'
import {ListItem, Card, Button} from 'react-native-elements'

import { Ionicons } from '@expo/vector-icons';

//import CurrencyPair from '../../CurrencyPair'
import {firebase} from '../../../firebase/config'
import {CurrencyContext} from '../../../context/Context'

import styles from './styles'
// import for the Buy and Sell Threshold
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  HeaderButtons,
  HeaderButton,
  Item,

} from 'react-navigation-header-buttons';


function CurrenciesScreen({navigation}) {
// context instance
    const currency = useContext(CurrencyContext);
    //hook for the modal
    const [modalopen, setModalOpen] = useState(false)
    const [pairmodalopen, setpairmodalopen] = useState(false)
//hook for the clicked currency pair
    const [clickedindex, setClickedIndex]  = useState(0)

    const [selectedValue, setSelectedValue] = useState(
      "BuyThreshold"
    );
    // hook for clearing output after submiting
    const [clearInput, setClearInput] = useState(false)
 
//Hooks for the price Threshold text inputs
   const [BuyThreshold, setBuyThreshhold] = useState('')
   const [SellThreshold, setSellThreshhold] = useState('')
   const [SMSMessage, setSMSMessage] = useState('')

 

   const IoniconsHeaderButton = (props) => (
    // the `props` here come from <Item ... />
    // you may access them and pass something else to `HeaderButton` if you like
    <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />

  );
useLayoutEffect(() => {
  navigation.setOptions({
      headerRight: () => (
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item title="add" iconName="ios-information-circle" iconSize = {30} onPress={() => setpairmodalopen(true)} />

          </HeaderButtons>        
      )
  })
},[navigation])
  // START OF FUNCTION DEFINITIONS
  function addAlerttoDB(){
    try {

      // adding of a currency pair to the db and referecing the api collection to the CURRENCY-PAIR COLLECTION
      const askPrice = ([...currency.data.prices[clickedindex].closeoutAsk].join('').toString())
      const bidPrice =([...currency.data.prices[clickedindex].closeoutBid].join('').toString())
      const CurrencyPair =  ([...currency.data.prices[clickedindex].instrument].join('').toString())
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
          Limit_Currency_Pair_Id: CurrencyPairDocRef, 
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
      const AlertsDoc = firebase.firestore().collection("Alerts").doc()
      const userId = firebase.auth().currentUser.uid
    

     const SMSDocref = firebase.firestore().collection('SMS').doc(SMSDoc.id)
      firebase.firestore().collection("Alerts")
      .where("Alert_SMS_Id", "==", SMSDocref)
      .get()

     const LimitDocref = firebase.firestore().collection("CURRENCY_PAIR_LIMITS").doc(LimitDoc.id)
     

     firebase.firestore().collection("Alerts")
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
  
 /* useEffect(() => {
    const getNumber = async() => {
      const numberref = firebase.firestore().collection()
      const snapshot = await numberref.get()
      snapshot.forEach((doc) => {
        setNumber(doc.data())

      })

    }
getNumber()
  },[])*/





const result = (currency.data.prices)
	.map((value) => (
	 ([value.instrument,value.closeoutAsk,value.closeoutBid])
	  )); 
    checkCondition(...result) ;
    

  function checkCondition({BuyThreshold,SellThreshold, SMSMessage}){
 
// initialize your stack
const myStack=[];

// create a new row
const row = [];

const SelectedCurrencyPair = currency.data.prices[clickedindex].instrument
row.push(SelectedCurrencyPair);
row.push(BuyThreshold);
row.push(SellThreshold)
row.push(SMSMessage);

// insert the row
myStack.push(row)
//console.log(myStack[1])
    // console.log(myStack[i][1])
  for (let j = 0; j < result.length; j++) {
    for (let i = 0; i < myStack.length; i++) {
        if( myStack[i][0] === result[j][0]){
          
          const Buydiff = myStack[i][1]-result[j][1]
          const Selldiff = result[j][1]-myStack[i][2]

          if ( myStack[i][1] === result[j][1] || (Math.abs(Buydiff) <= .00002)
        ) {

          
          Alert.alert(myStack[i][0],myStack[i][3])
          
        }
        else if( myStack[i][2] === result[j][2] || (Math.abs(Selldiff) <= .00002) )
        {
          Alert.alert(myStack[i][0], myStack[i][3])
        }
        else
         {
          console.log("Price not reached")
        }
        }
        else{
          console.log("Wrong currency pair")
        }
    }
  }
 
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
           visible={pairmodalopen}
           transparent={true}
           animationType={"fade"}
          >
            <View style={{flex: 1, backgroundColor: '#000000aa'}}>
              <View style={{ backgroundColor: '#ffffff', padding: 30,flex: 1, borderRadius: 10}}>
              
                <Text style={{textAlign: "auto", fontWeight: "bold"}}>AUD_CAD: Australian_Dollar/Canadian_Dollar</Text>


                <Text style={{textAlign: "center", fontWeight: "bold"}}>AUD_CHF: Australian_Dollar/Swiss_Franc</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>AUD_NZD: Australian_Dollar/NewZealand_Dollar</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>AUD_USD: Australian_Dollar/US_Dollar</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>CAD_CHF: Canadian_Dollar/Swiss_Franc</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>CAD_JPY: Canadian_Dollar/Japanese_Yen</Text>

                <Text style={{textAlign: "center", fontWeight: "bold"}}>EUR_AUD: Euro/Australian_Dollar</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>EUR_CAD: Euro/Canadian_Dollar</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>EUR_CHF: Euro/Swiss_Franc</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>EUR_GBP: Euro/British_Pound</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>EUR_NZD: Euro/NewZealand_Dollar</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>EUR_USD: Euro/US_Dollar</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>EUR_ZAR: Euro/SouthAfrican_Rand</Text>

                <Text style={{textAlign: "center", fontWeight: "bold"}}>GBP_AUD: British_Pound/Australian_Dollar</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>GBP_CAD: British_Pound/Canadian_Dollar</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>GBP_JPY: Canadian_Dollar/Japanese_Yen</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>GBP_CHF: British_Pound/Swiss_Franc</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>GBP_NZD: British_Pound/NewZealand_Dollar</Text>

                <Text style={{textAlign: "center", fontWeight: "bold"}}>GBP_USD: British_Pound/US_Dollar</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>NZD_CAD: NewZealand_Dollar/Canadian_Dollar</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>NZD_CHF: NewZealand_Dollar/Swiss_Franc</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>NZD_USD: NewZealand_Dollar/US_Dollar</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>USD_CAD: US_Dollar/Canadian_Dollar</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}>USD_CHF: US_Dollar/Swiss_Franc</Text>
                <Text style={{textAlign: "center", fontWeight: "bold"}}></Text>

                <Ionicons
                name="ios-close-circle"
                size={35}
                onPress ={() => setpairmodalopen(false)}

                />
              </View>
            </View>

          </Modal>
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

              <View style={{justifyContent: "center", alignItems: "center"}}>
                <View style={{ marginBottom: 10}}>
                <Picker
                  mode= "dropdown"
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>setSelectedValue(itemValue) }
          >
            <Picker.Item label="BuyThreshold" value="BuyThreshold" /> 
            <Picker.Item label="SellThreshold" value="SellThreshold" />
            
          </Picker>

                </View>
              
          {
            selectedValue === "BuyThreshold" ? 
            <TextInput
                  style={styles.textInputStyle}
                  autoCorrect={false}
                  value={ BuyThreshold}
                  onChangeText = {(BuyThreshold) => setBuyThreshhold(BuyThreshold)}
                  placeholder="BuyPrice"
                  placeholderTextColor="#60605e"
                  numeric
                  
                  clearButtonMode='always'
                  keyboardType='decimal-pad'	
                /> : 
                <TextInput
                  style={styles.textInputStyle}
                  value={SellThreshold}
                  onChangeText = {(SellThreshhold) => setSellThreshhold(SellThreshhold)}
                  placeholder="Sell Price"
                  placeholderTextColor="#60605e"
                  numeric
                  clearButtonMode='always'
                  keyboardType='decimal-pad'	
                />

          }
              </View>
             
              <View style={{ flexDirection: "row", justifyContent:"center", marginTop: 20 }}>
              
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
                   if ((BuyThreshold && SellThreshold).length < 7 && (BuyThreshold && SellThreshold).length > 7){
                     Alert.alert("Enter a valid Price")
                   }
                   
                   return ;
                   
                 }
                
               
                
      
                 addAlerttoDB();
                 checkCondition({BuyThreshold, SMSMessage, SellThreshold})
                 navigation.navigate("My Alerts")
                
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
              Pair                         BuyPrice                  SellPrice
            </ListItem.Title>
            <ListItem.Subtitle>
            {item.instrument}                        {item.closeoutAsk}                    {item.closeoutBid}
            </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>     
                )
            })
}
        </View>
    </KeyboardAwareScrollView>
)
}
export default CurrenciesScreen