import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native';

import SearchResults from './searchresults'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchString: 'london',
      isLoading: false,
    }
  }
  render() {
    const spinner = this.state.isLoading? <ActivityIndicator size='large' /> : null
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Search for housees to buy!</Text>
        <Text style={styles.description}>Search by place-name or postcode.</Text>
        <View style={styles.flowRight}>
          <TextInput style={styles.searchInput}
            placeholder='Search via name or postcode'
            value={this.state.searchString}
            onChange={ ()=>{ this.setState({searchString: event.nativeEvent.text}) } }
            />
          <Button onPress={ this._onSearchPress } color='#4bc' title='GO' />
        </View>

        {spinner}
        <Text>{this.state.message}</Text>
    </View>
    )
  }
_handleResponse = (json) => {
  this.setState({
    isLoading: false,
    messsage: '',

  })
  if( json.response.application_response_code.substr(0,1) === '1') {
    this.setState({ message: 'Properites found: '+ json.response.listings.length})
    this.props.navigator.push({
      title: "Search Result",
      component: SearchResults,
      passProps: { listings: json.response.listings}
    })
  } else {
    this.setState({ message: "Location not recognized, please try again!"})
  }

}
  _executeQuery = (query) => {
    console.log(query)
    this.setState({ isLoading: true})
    fetch(query)
      .then(response => response.json())
      .then( json => this._handleResponse(json))
      .catch( err => {
        this.setState({
          isLoading: false,
          message: "something wrong " + err
        })
      })
  }
  _onSearchPress = (event) => {
    const query = urlForQueryAndPage('place_name', 'london', 1)
    this._executeQuery(query)
  }


}

function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber,
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'https://api.nestoria.co.uk/api?' + querystring;
}
const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 60,
    alignItems: 'center',
    backgroundColor: '#ef0',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#09f',
    color: '#000'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  description: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    color: '#888',
  }
})
