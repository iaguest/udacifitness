import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification
 } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { purple, white } from '../utils/colors'
import { CommonActions } from '@react-navigation/native'

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={ Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn }
      // NB: onPress not onClick as we are in React Native!
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }
  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState((state) => {
      const count = state[metric] + step;
      return {
        ...state,
        [metric]: count > max ? max : count
      }
    })
  }
  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step;
      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      }
    })
  }
  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value,
    }))
  }
  submit = () => {
    const key = timeToString();
    const entry = this.state;
    
    this.props.dispatch(addEntry({
      [key]: entry
    }));

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }));

    // Navigate to home
    this.toHome();
    // Save to 'DB'
    submitEntry({key, entry});
    // Clear local notification
    clearLocalNotification()
      .then(setLocalNotification);
  }
  reset = () => {
    const key = timeToString();
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue(),
    }));
    // Route to Home
    this.toHome();
    // Update "DB"
    removeEntry(key);
  }
  toHome = () => {
    this.props.navigation.dispatch(
      CommonActions.goBack({
          key: 'AddEntry',
      }))  
  }
  render() {
    const metaInfo = getMetricMetaInfo();

    return (
      <View style={styles.container}>
        <DateHeader date={(new Date().toLocaleDateString())}/>
        { Object.keys(metaInfo).map((key) => {
            const { getIcon, type, ...rest } = metaInfo[key];
            const value = this.state[key];
            return (
              <View key={key} style={styles.row}>
                {getIcon()}
                {type === 'slider'
                  ? <UdaciSlider
                      value={value}
                      onChange={(value)=>this.slide(key,value)}
                      {...rest}
                    />
                  : <UdaciSteppers
                      value={value}
                      onIncrement={()=>this.increment(key)}
                      onDecrement={()=>this.decrement(key)}
                      {...rest}
                    />}
              </View>
            );
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30
  }
});

export default connect()(AddEntry);
