import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS
 } from 'react-native';

 import SearchPage from './view/d1/searchpage'

export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property finder',
          component: SearchPage,
        }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
