import React, {useEffect,useState} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LogInScreen from '../Navigation/Screens/LogInScreen'
import HomeScreen from '../Navigation/Screens/HomeScreen'
import CreateAlertScreen from '../Navigation/Screens/CreateAlertScreen'
import AlertScreen from '../Navigation/Screens/AlertScreen'
import LoadingScreen from '../Navigation/Screens/LoadingScreen' 
import {firebase} from '../firebase/config'

const Stack = createStackNavigator()

export default function(){

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);
  if (loading) {
    return (
      <></>
    )
  }

  return(
    <NavigationContainer>
      <Stack.Navigator >
      { user ? (
        <>
          <Stack.Screen name="HomeScreen">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
          <Stack.Screen name="AlertsScreen" component={AlertScreen}/>
        <Stack.Screen name="CreateAlertScreen" component={CreateAlertScreen}/>
          </>
        ) : (
          <>
           <Stack.Screen name="LogInScreen" component={LogInScreen}/>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen}/>
          </>
        )}

        
      
     </Stack.Navigator>
    </NavigationContainer>

  );
}


        
       

/*const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
        <Tab.Navigator 
        screenOptions={({ route }) => ({
            tabBarIcon: ({focused, color, size}) =>
            {
                let iconName;
                if(route.name == 'Home'){
                    iconName = focused
                    ? 'ios-home'
                    : 'ios-home';
                }
                else if(route.name = 'Settings'){
                    iconName = focused ? 'ios-list-box' : 'ios-list';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },

        })
    }
    tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
        >
            <Tab.Screen name = 'HomeScreen' component={HomeScreen}/>
            <Tab.Screen name = 'AlertScreen' component={AlertScreen}/>
        </Tab.Navigator>

  );
}*/