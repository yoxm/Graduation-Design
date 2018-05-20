import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.loadingContainer}>
        <Bubbles size={10} color="#FFFFFF" style={styles.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: 'rgb(55,178,177)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
