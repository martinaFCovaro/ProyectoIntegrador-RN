import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { db, auth } from '../firebase/config';


class Home extends Component{
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    if (!auth.currentUser) {
      this.props.navigation.navigate('Login')
    }

    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
      docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          });
        });

        this.setState({
          posteos: posts
        });
      });
  }

  render() {
    return (
      <View>
        <Text></Text>
      </View>
    )

  }
}

export default Home;