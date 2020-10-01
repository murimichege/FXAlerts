import React from 'react'
import MainStackNavigation from './src/Navigation/MainNavigator'
import { YellowBox } from 'react-native';
import {CurrencyProvider} from './src/context/Context'
YellowBox.ignoreWarnings(['Setting a timer']);

const App = () => {
  return (
    <CurrencyProvider>
      <MainStackNavigation/>
    </CurrencyProvider>

  )
}

export default App
