import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import MetricCard from './MetricCard'

class EntryDetail extends React.Component {
  setTitle = (entryId) => {
    this.props.navigation.setOptions({
      title:`${entryId.slice(5, 7)}-${entryId.slice(8)}-${entryId.slice(0, 4)}`}
    );
  }
  componentDidMount(){
    this.setTitle(this.props.route.params.entryId);
  }
  render() {
    const { metrics, entryId } = this.props;
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  }
})

function mapStateToProps(state, { route }) {
  const { entryId } = route.params;
  return {
    entryId,
    metrics: state[entryId]
  }
}

export default connect(mapStateToProps)(EntryDetail);
