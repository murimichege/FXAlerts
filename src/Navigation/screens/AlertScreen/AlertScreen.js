import React, {useEffect, useState} from 'react'
import {ScrollView, ActivityIndicator, Text} from 'react-native'
import { ListItem} from 'react-native-elements'
import {firebase} from '../../../firebase/config'
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function AlertScreen() {

    const [alerts, setAlerts] = useState([])
    
 
    useEffect(() => {
        const fetchAlerts = async() => {
            const db = firebase.firestore()
            const data = await db.collection("CURRENCY_PAIR_LIMIT").get()
            setAlerts(data.docs.map(doc => doc.data()))
        }
        fetchAlerts();

    },[])

 
   function itemRemove({index, id}) {
        const newAlerts = [...alerts];
        newAlerts.splice(index, 1);
        setAlerts(newAlerts);
       /* const CurrencyRef = firebase.firestore().collection("CURRENCY_PAIR")
        .doc(CurrencyRef.id).delete()
        .then(() => console.log("Alert Deleted Successfully"))*/
          }
     
    return (
    
        <ScrollView>
            
        {
            
            alerts.length === 0 ?
            <Text style = {{textAlign: "center", justifyContent: "center"}}>
                You have no alerts set
            </Text> 
            :
          alerts &&  alerts.map((item, i) => {
                return (
                    
                            <ListItem key={i} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>
                                    {item. Limit_Currenct_Pair_Name}
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    {item.Limit_Buy_Price_Threshhold}
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
