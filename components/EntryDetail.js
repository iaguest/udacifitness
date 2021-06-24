import React from 'react'
import { View, Text } from 'react-native'

class EntryDetail extends React.Component {
  setTitle = (entryId) => {
    this.props.navigation.setOptions({
      title:`${entryId.slice(0, 4)}-${entryId.slice(5, 7)}-${entryId.slice(8)}`}
    );
  }
  componentDidMount(){
    this.setTitle(this.props.route.params.entryId);
  }
  render() {
    return (
      <View>
        <Text>Entry Detail</Text>
      </View>
    );
  }
}

export default EntryDetail;
