import {connect} from 'react-redux';
import React, {Component} from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

const s2p = (s: any) => s.user;
const d2p = {};
export default connect(
  s2p,
  d2p,
)(
  class User extends Component<any, any> {
    render() {
      const {name} = this.props;
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <Text>{name}</Text>
          </SafeAreaView>
        </>
      );
    }
  },
);
