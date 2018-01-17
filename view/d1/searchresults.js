import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  NavigatorIOS,
  Button,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import PropertyDetail from './propertydetail'

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index)
  }
  render() {
    const item = this.props.item
    const price = item.price_formatted
    return (
      <TouchableHighlight
        underlayColor='#ddd'
        onPress={this._onPress}>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb}
              source={{uri: item.img_url}} />
            <View style={styles.textContainer}>
              <Text>{item.title}</Text>
              <Text style={styles.price}>{price}</Text>
              <Text>{item.summary}</Text>
            </View>
            <View style={styles.separator} />
          </View>
          </View>
      </TouchableHighlight>
    )
  }
}
export default class SearchResults extends Component {

  _keyExtractor = (item,index) => index
  _renderItem = ({item,index}) =>
    (
      <ListItem
        item={item}
        index={index}
        onPressItem={this._onPressItem}
        />
    )

  _onPressItem = (index) => {
    console.log(index)
    this.props.navigator.push({
      title: "Property Detail",
      component: PropertyDetail,
      passProps: { item: this.props.listings[index]}
    })
  }
  render() {
    return (

        <FlatList
          data={this.props.listings}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          />


    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 60,
    alignItems: 'center',
    backgroundColor: '#ef0',
  },
  thumb: {
    width: 100,
    height: 100,
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
    color: 'white'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }

})
