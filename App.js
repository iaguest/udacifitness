import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers'
import { purple, white, gray } from './utils/colors'
import History from './components/History';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants'

function UdaciStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: purple,
              inactiveTintColor: gray,
              labelStyle: {
                fontSize:20,
              },
              style: {
                height: 90,
              }
            }}
          >
            <Tab.Screen
              name="History"
              component={History}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name='ios-bookmarks' color={color} size={size} />
                ),                
              }}
              />
            <Tab.Screen
              name="Add Entry"
              component={AddEntry}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome name='plus-square' color={color} size={size} />
                ),                
              }}
              />
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
