import React, {useEffect, useState, useLayoutEffect} from 'react'
import {ScrollView, ActivityIndicator, Text, View, Button, TextComponent} from 'react-native'
import { ListItem} from 'react-native-elements'
import {firebase} from '../../../firebase/config'
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

//import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    HeaderButtons,
    HeaderButton,
    Item
  } from 'react-navigation-header-buttons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../CurrenciesScreen/styles';
  

export default function AlertScreen({navigation}) {

    const [alerts, setAlerts] = useState()
 

    
 useEffect(() => {
getItems()
 },[])

 async function execute() {
   const htmlitem = await AsyncStorage.getItem('key');
   
   const html = `<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Pdf Content</title>
       <style>
           body {
               font-size: 16px;
           }
           h1 {
               text-align: center;
           }
       </style>
   </head>
   <body>
                 <h1>My Alerts</h1>
       <h1>` + JSON.parse(htmlitem) +`</h1>
   </body>
   </html>
`
  const { uri } = await Print.printToFileAsync({ html });
  Sharing.shareAsync(uri);
}
 

 async function getItems() {

  try {
    const items =  await AsyncStorage.getItem('key');
  
    if (items !== null) {
      //console.log(JSON.parse(myArray));
      setAlerts(JSON.parse(items))
    }      
  } catch (error) {
    console.log(error)
  }
 }
    
 
     
    

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

     
    return (

        <ScrollView >
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>
                {alerts}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>

<View style={{alignItems: "center"}}>
<TouchableOpacity style={styles.button} onPress ={() => execute()}>
          <Text>Download PDF</Text>
      </TouchableOpacity>
    
    
    
</View>
      
        </ScrollView>

    )
}
