import React, {useEffect, useState} from 'react'
import {ScrollView, ActivityIndicator} from 'react-native'
import { ListItem} from 'react-native-elements'
import {firebase} from '../../../firebase/config'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { List } from 'react-native-paper';


export default function AlertScreen() {

    const [alerts, setAlerts] = useState([])
    
 useEffect(() =>{
    const fetchAllCurrencies = async () => {
        const obj = []; // empty array to put collections in
        const currencyRef = firebase.firestore().collection('CURRENCY_PAIR'); // ref
        const currencysnapshot = await currencyRef.get() // resolve promise from firestore
        currencysnapshot.forEach((doc) => { // loop over data
          obj.push({ id: doc.id, ...doc.data() }); // push each collection to array
        });
          const obj2 = []
          const Limitref = firebase.firestore().collection("CURRENCY_PAIR_LIMIT")
          const limitsnapshot = await Limitref.where("Limit_Buy_Price_Threshhold", "==", currencyRef.id)
          .get()
          limitsnapshot.forEach((doc) => {
              obj2.push({id: doc.id, ...doc.data()})
          });
        const obj3 = []
        const Alertref = firebase.firestore().collection("Alerts")
        const alertsnapshot = await Alertref.where("Alert_Limit_Id", "==",Limitref.id)
        .get()
        alertsnapshot.forEach((doc) => {
            obj3.push({id: doc.id, ...doc.data()})
        });
        
         obj.push(...obj2,...obj3)
        setAlerts(allalerts)
       // console.log(allalerts)
        //return allalerts; // returns on array with all the concatenated elements
    }
    fetchAllCurrencies();
 },[])
 
   function itemRemove({index, id}) {
        const newAlerts = [...alerts];
        newAlerts.splice(index, 1);
        setAlerts(newAlerts);
        const CurrencyRef = firebase.firestore().collection("CURRENCY_PAIR")
        .doc(CurrencyRef.id).delete()
        .then(() => console.log("Alert Deleted Successfully"))
          }
     
    return (
    
        <ScrollView>
        {
            
          alerts &&  alerts.map((item, i) => {
                return (
                    
                            <ListItem key={i} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>
                                    {item.CurrencyPair_Name}
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                </ListItem.Subtitle>
                                
                                <MaterialCommunityIcons
                                name="delete"
                               onPress={() =>itemRemove(i)}
                            
                                size={24}
                                color="black"
                                style={{position:"absolute", right: 3}}/> 
                            </ListItem.Content>
                        </ListItem>

                     
                    
                
                )                     
            } 
            )
            
        }
        </ScrollView>
         
    )
}
