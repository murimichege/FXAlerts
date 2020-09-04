//Default imports
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Screen imports
import HomeScreen from '../Navigation/Screens/HomeScreen'
import AlertScreen from '../Navigation/Screens/AlertScreen'
import CreateAlertScreen from '../Navigation/Screens/CreateAlertScreen'
import LogInScreen from '../Navigation/Screens/LogInScreen'
import SignUpScreen from '../Navigation/Screens/SignUpScreen'


const Stack = createStackNavigator();

const MainStackNavigation = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AlertScreen" component={AlertScreen} />
            <Stack.Screen name="CreateAlert" component={CreateAlertScreen} />
            <Stack.Screen name="Login" component={LogInScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>

            
          </Stack.Navigator>
        </NavigationContainer>
      );

}
export default MainStackNavigation