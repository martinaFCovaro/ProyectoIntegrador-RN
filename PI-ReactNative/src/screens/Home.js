import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { db, auth } from '../firebase/config';


export default class Home extends Component() {
  constructor(props){
    super(props)
    this.state = {
      posts: []
    }
  }
}