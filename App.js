import React from 'react'
import MainStackNavigation from './src/Navigation/MainNavigator'
import { YellowBox, LogBox } from 'react-native';
import {CurrencyProvider} from './src/context/Context'
import {Root} from 'native-base'
YellowBox.ignoreWarnings(['Setting a timer']);


const App = () => {
  return (
    <CurrencyProvider>
      <Root>
      <MainStackNavigation/>
      </Root>
    </CurrencyProvider>

  )
}

export default App
