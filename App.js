import React from 'react'
import MainStackNavigation from './src/Navigation/MainNavigator'
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);

const App = () => {
  return (
    <MainStackNavigation/>
  )
}

export default App
