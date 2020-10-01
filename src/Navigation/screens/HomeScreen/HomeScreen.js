import React, {useContext} from 'react'
import { Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import {ListItem, Card, Button, Icon} from 'react-native-elements'
//import CurrencyPair from '../../CurrencyPair'
import {firebase} from '../../../firebase/config'
import {CurrencyContext} from '../../../context/Context'

function HomeScreen({navigation}) {

    const currency = useContext(CurrencyContext);


return (
        <ScrollView>
    
        <Card>
            <Text style={{textAlign: "center"}}>
                Welcome
            </Text>
            <Button title="Sign Out" type="outline" onPress ={() => firebase.auth().signOut()}/>
            <Button title="My Alerts"  onPress ={() =>navigation.navigate("AlertScreen") }/>
            
        </Card>
  
        <View>
            {currency.data.prices && currency.data.prices.map((prices, index) => {
                return (
      <ListItem
        key={index}
        //passing data from HomeScreen to CreateAlert Screen with  the initialized parameters
        onPress = {() => navigation.navigate('CreateAlertScreen')}
        bottomDivider>
        <ListItem.Content>
            <ListItem.Title>
            {currency.data.prices[index].instrument}        {currency.data.prices[index].closeoutAsk}        {currency.data.prices[index].closeoutBid}
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
