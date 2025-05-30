import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config';

export default class CrearPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comentario: "",
      likes: []
    }
  }
  componentDidMount() {
    db.collection('posts').onSnapshot(docs => {
      let arr = [];
      docs.forEach(doc => {
        arr.push({
          id: doc.id,
          data: doc.data()
        });
      });
      this.setState({ comentarios: arr });
    });
  }
  publicarComentario() {
    if (this.state.comentario !== '') {
      db.collection('posts').add({
        createdAt: Date.now(),
        owner: auth.currentUser.email,
        comentario: this.state.comentario,        
        likes: []
      })
        .then(() => this.setState({ comentario: '' }))
        .catch(error => console.log(error));
    }
  } 
  
  render() {
    return (
      <View>
        <Text>CrearPost</Text>
        <View>
          <TextInput
            style={styles.input}
            keyboardType="default"
            onChangeText={(texto) => this.setState({ comentario: texto })}
            placeholder="Comentar"
            value={this.state.comentario}
          />
          <TouchableOpacity onPress={() => this.publicarComentario()}>
            <Text>Postear</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "red"
  }
})
