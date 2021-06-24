import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers'
import { purple, white } from './utils/colors'
import History from './components/History';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="History" component={History} />
            <Tab.Screen name="Add Entry" component={AddEntry} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
});
