import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config';

export default class CrearPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comentario: "",
    }
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
      <View style={styles.container}>
        <Text style={styles.titulo}>Crear un nuevo post</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            keyboardType="default"
            onChangeText={(texto) => this.setState({ comentario: texto })}
            placeholder="Hace tu post!..."
            placeholderTextColor="#b49c9c"
            value={this.state.comentario}
          />
          <TouchableOpacity style={styles.boton} onPress={() => this.publicarComentario()}>
            <Text style={styles.textoBoton}>Postear</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf4',
    padding: 30,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5e4b4b',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#fcefe8',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#decfcf',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    color: '#4b3d3d',
    marginBottom: 15,
  },
  boton: {
    backgroundColor: '#d9a5b3',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  textoBoton: {
    color: '#fffaf4',
    fontWeight: '600',
    fontSize: 16
  }
});

