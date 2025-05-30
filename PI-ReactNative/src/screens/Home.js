import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { db, auth } from '../firebase/config';
import { FlatList } from 'react-native-web';


class Home extends Component {
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
          posts: posts
        });
      });
  }

  render() {
    return (
      <View>
        <Text>Bienvenido {auth.currentUser.email}</Text>
        {
          this.state.posts.length === 0 ? (
            <Text>No hay posteos aún</Text>
          ) : (
            <View>
              <Text>Posteos:</Text>
              <FlatList
                data={this.state.posts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                  <View>
                    <Text>{item.data.comentario}</Text>
                    <Text>Creado por: {item.data.owner}</Text>
                    {/* Falta poner acá la cantidad de likes */}
                    {/* Falta poner acá el botón de logout? */}
                  </View>
                }
              />
            </View>
          )
        }
      </View>
    )

  }
}

export default Home;