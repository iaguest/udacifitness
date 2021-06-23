import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers'
import { white } from './utils/colors'
import History from './components/History';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View
          style={[styles.container,
                 { padding: Platform.OS === 'ios' ? 50 : 30 }]}
        >
          <View style={{height:20}} />
          <History />
        </View>
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
