//Default imports
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';

//Screen imports
import Home from '../Navigation/Screens/HomeScreen'
import Alerts from '../Navigation/Screens/AlertScreen'
import CreateAlert from '../Navigation/Screens/CreateAlertScreen'
import LogIn from '../Navigation/Screens/LogInScreen'
import SignUp from '../Navigation/Screens/SignUpScreen'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const MainStackNavigation = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={Home}>
            <Stack.Screen name="Home" component={MainTabNavigator} />
            <Stack.Screen name="AlertScreen" component={Alerts} />
            <Stack.Screen name="CreateAlert" component={CreateAlert} />
            <Stack.Screen name="Login" component={LogIn}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
          </Stack.Navigator>
        </NavigationContainer>
      );

}


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
                else if(route.name = 'Alerts'){
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
            <Tab.Screen name = 'Home' component={Home}/>
            <Tab.Screen name = 'Alerts' component={Alerts}/>
        </Tab.Navigator>

  );
}
export default MainStackNavigation