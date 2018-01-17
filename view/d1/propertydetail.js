import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,

} from 'react-native';

import Mapview from 'react-native-maps'

export default class PropertyDetail extends React.PureComponent {


  render() {
    const item = this.props.item
    console.log("property detail: " + item.title)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <Image
          source={{uri: item.img_url}}
          style={styles.image}
          />
        <View style={styles.textContainer}>
          <Text>{item.summary}</Text>
          <Text> {item.bedroom_number} bed rooms and {item.bathroom_number} bath rooms</Text>
        </View>
      

      </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 60,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 400,
    height: 300,
    marginRight:10,
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc"
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#bbe",
  },
  title: {
    fontSize: 20,
    color: 'steelblue'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }

})
