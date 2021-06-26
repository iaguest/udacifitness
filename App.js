import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers'
import { purple, white, gray, red } from './utils/colors'
import History from './components/History';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants'
import EntryDetail from './components/EntryDetail';
import Live from './components/Live'

function UdaciStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: purple,
          inactiveTintColor: gray,
          labelStyle: {
            fontSize:20,
          },
          style: {
            height: 90,
            backgroundColor: white,
            borderTopWidth: 1,
            borderTopColor: 'black' 
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
        <Tab.Screen
          name="Live"
          component={Live}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='ios-speedometer' color={color} size={size} />
            ),                
          }}
          />
      </Tab.Navigator>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false}}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}/>
            <Stack.Screen
              name="EntryDetail"
              component={EntryDetail}
              options={{headerTintColor: white, headerStyle: {backgroundColor: purple}}} />
          </Stack.Navigator>
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
