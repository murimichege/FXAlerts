import React, {useEffect, useState} from 'react'
import {ScrollView} from 'react-native'
import {Card, ListItem, Icon} from 'react-native-elements'
import {firebase} from '../../../firebase/config'
export default function AlertScreen() {

    const [alerts, setAlerts] = useState([])

    useEffect(() => {
        const fetchAlerts = async() => {
            const db = firebase.firestore()
            const data = await db.collection("Alerts").get()

            setAlerts(data.docs.map(doc => doc.data()))
        }
        fetchAlerts();

    },[])

    function deleteAlert(){

    }
    return (
        <ScrollView>
        {
          alerts &&  alerts.map((l,i) => {
                return (
                    <ListItem key={i} bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>
                        
                    </ListItem.Title>
                    <ListItem.Subtitle>

                    Alert Price: {l. alert_Price}
                    <Icon name="delete"/>

                    </ListItem.Subtitle>
                  
                </ListItem.Content>
            </ListItem>
                )
            }
            
            
            )
            
        }
        </ScrollView>
         
    )
}
