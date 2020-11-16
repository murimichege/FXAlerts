import React, {useEffect, useState} from 'react'
import {ScrollView} from 'react-native'
import {Card, ListItem} from 'react-native-elements'
import {firebase} from '../../../firebase/config'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment'
export default function AlertScreen() {

    const [limit, setLimit] = useState([])
    const[currencyPair, setcurrencyPair] = useState([])

    useEffect(() => {
        const fetchAlerts = async() => {
            const db = firebase.firestore()
            const data = await db.collection("CURRENCY_PAIR_LIMIT").get()
            setAlerts(data.docs.map(doc => doc.data()))
            firebase.firestore.collection("CURRENCY_PAIR").get()
            setcurrencyPair(data.docs.map(doc => doc.data()))
        }
        fetchAlerts();

    },[])

    
    return (
        <ScrollView>
        {
          alerts  &&  alerts.map((l,i) => {
                return (
                    <ListItem key={i} bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>

                        {l.alert_Currency_Pair}
                    </ListItem.Title>
                    
                    <ListItem.Subtitle>
                    Alert Price: {l. alert_Price}

                    </ListItem.Subtitle>
                    
                    <MaterialCommunityIcons name="delete" size={24} color="black" style={{position:"absolute", right: 3}}/> 
                </ListItem.Content>
            </ListItem>
                )
            }
            
            
            )
            
        }
        </ScrollView>
         
    )
}
