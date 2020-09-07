//Default imports
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';

//Screen imports
import LoadingScreen from './Screens/LoadingScreen'
import HomeScreen from './Screens/HomeScreen'
import AlertScreen from './Screens/AlertScreen'
import CreateAlertScreen from './Screens/CreateAlertScreen'
import LogInScreen from './Screens/LogInScreen'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStackNavigation = () => {
    return (
          
        <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen name="LogInScreen" component={LogInScreen }/>
           <Stack.Screen name="LoadingScreen" component={LoadingScreen}/>        
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="AlertScreen" component={AlertScreen} />
            <Stack.Screen name="CreateAlert" component={CreateAlertScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );

}


/*function MainTabNavigator() {
  return (
        <Tab.Navigator 
        screenOptions={({ route }) => ({
            tabBarIcon: ({focused, color, size}) =>
            {
                let iconName;
                if(route.name == 'HomeScreen'){
                    iconName = focused
                    ? 'ios-home'
                    : 'ios-home';
                }
                else if(route.name = 'AlertScreen'){
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
export default MainStackNavigation