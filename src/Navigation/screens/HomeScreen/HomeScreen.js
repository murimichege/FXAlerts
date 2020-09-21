import React, {useEffect, useState, useRef} from 'react'
import { Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import axios from '../../../utils/axios'
import {ListItem, Card, Button, Icon} from 'react-native-elements'
//import CurrencyPair from '../../CurrencyPair'
import {firebase} from '../../../firebase/config'
function HomeScreen({navigation}) {
    const [data, setData] = useState([])
    const [isLoading, setIsloading] = useState(true)
  

    useEffect(() => {
        const interval = setInterval(() => {
            const fetchpairs = async() => {
                const results = await axios.get('/v3/accounts/101-004-14328428-002/pricing?instruments=AUD_CAD%2CAUD_CHF%2CAUD_JPY%2CAUD_NZD%2CAUD_USD%2CCAD_CHF%2CCAD_JPY%2CCHF_JPY%2CEUR_AUD%2CEUR_CAD%2CEUR_CHF%2CEUR_GBP%2CEUR_NOK%2CEUR_NZD%2CEUR_USD%2CGBP_AUD%2CGBP_CAD%2CGBP_CHF%2CGBP_USD%2CGBP_JPY%2CNZD_CAD%2CNZD_CHF%2CNZD_JPY%2CUSD_CAD%2CUSD_JPY%2CUSD_CHF%2CUSD_ZAR%2CUSD_MXN')
                setData(results.data)
                setIsloading(false)
            }
            fetchpairs() 
        },1000)
      }, []);
if(isLoading) {
    return (
        <ActivityIndicator size="large"/>
    )
}else
return (
    <ScrollView
    >
        <Card>
            <Text style={{textAlign: "center"}}>
                Welcome
            </Text>
            <Button title="Sign Out" type="outline" onPress ={() => firebase.auth().signOut()}/>
            <Button title="My Alerts"  onPress ={() =>navigation.navigate("AlertScreen") }/>
            
        </Card>
  
        <View>
            {data.prices && data.prices.map((prices, index) => {
                return (
      <ListItem
        key={index}
        //passing data from HomeScreen to CreateAlert Screen with  the initialized parameters
        onPress = {() => navigation.navigate('CreateAlertScreen', {
        instrumentname: data.prices[index].instrument ,
        BidPrice: data.prices[index].closeoutBid,
        AskPrice: data.prices[index].closeoutAsk
        })}
        bottomDivider>
        <ListItem.Content>
            <ListItem.Title>
            {data.prices[index].instrument}        {data.prices[index].closeoutAsk}        {data.prices[index].closeoutBid}
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
