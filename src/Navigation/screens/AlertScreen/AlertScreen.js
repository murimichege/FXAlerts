import React, {useEffect, useState, useLayoutEffect} from 'react'
import {ScrollView, ActivityIndicator, Text, View, Button, TextComponent} from 'react-native'
import { ListItem} from 'react-native-elements'
import {firebase} from '../../../firebase/config'
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

//import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    HeaderButtons,
    HeaderButton,
    Item
  } from 'react-navigation-header-buttons';
  

export default function AlertScreen({navigation}) {

    const [alerts, setAlerts] = useState([])
 
    useEffect(() => {
    const fetchAlerts = () => {
        const CurrencyPairref= firebase.firestore().collection("CURRENCY_PAIR")
       const Limitref =    firebase.firestore().collection("CURRENCY_PAIR_LIMIT")
  
       Promise.all([Limitref.get(),CurrencyPairref.get() ])
        // merge the results
  .then(promiseResults => {
      promiseResults.forEach( snapshot => {
          setAlerts(snapshot.forEach( doc => (doc.data()) ))
     })
 
    
    // return mergedData;
  })
  


    }
    fetchAlerts();
        

    },[])

    
  

    async function logOut() {
        try {
         await firebase.auth().signOut();
        const resetAction = NavigationActions.reset({
         index: 0,
         routes: [{name: "LogIn"}]
       }) 
       navigation.dispatch(resetAction)
         
        } catch (error) {
          console.log(error)
        }
       }
    const IoniconsHeaderButton = (props) => (
        // the `props` here come from <Item ... />
        // you may access them and pass something else to `HeaderButton` if you like
        <HeaderButton IconComponent={Ionicons} iconSize={23}  {...props} />

      );
  useLayoutEffect(() => {
      navigation.setOptions({
          headerRight: () => (
              <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
             <Item title="search" iconName="ios-add-circle" iconSize={30} onPress={() => navigation.navigate("CurrencyPairs")} />
               <Item title="search" iconName="ios-log-out" iconSize={30} onPress={() => logOut()} />

              </HeaderButtons>        
          )
      })
  },[navigation])

  function itemRemove({index, id}) {
    const newAlerts = [...alerts];
    newAlerts.splice(index, 1);
    setAlerts(newAlerts);
  const LimitDoc=  firebase.firestore().collection("CURRENCY_PAIR_LIMIT").doc()
    firebase.firestore().collection("CURRENCY_PAIR_LIMIT").doc(LimitDoc.id).delete()
      }
     
    return (

        <ScrollView >
            
        {
            
            
           
         alerts && alerts.map((item, i) => (
               
                    
                            <ListItem key={i} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>
                                    {item.Limit_Currency_Pair_Name}
                                </ListItem.Title>
                                
                                <ListItem.Subtitle>
                                    
                                 Buy_Threshold Price:   {item.Limit_Buy_Price_Threshhold}
                                </ListItem.Subtitle>   
                                <ListItem.Subtitle>
                                 Sell_Threshold Price:   {item.Limit_Sell_Price_Threshhold}
                                </ListItem.Subtitle>
                                
                               
                            </ListItem.Content>
                        </ListItem>
                )                     
         )
            
            
        }
        </ScrollView>

    )
}
