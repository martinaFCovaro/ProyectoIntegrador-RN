import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { db, auth } from '../firebase/config';
import { FlatList } from 'react-native-web';
import User from '../components/User';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      loading: true,
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
          posts: posts,
          loading: false
        });
      });
  }


  render() {
    if (this.state.loading) {
      return (
        <View style={styles.cargando}>
          <ActivityIndicator size="large" color="#a47179" />
          <Text style={styles.textoCargando}>Cargando posteos...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.tituloBienvenida}>Bienvenido {auth.currentUser.email}</Text>
        {
          this.state.posts.length === 0 ? (
            <Text style={styles.sinPosteos}>No hay posteos aún</Text>
          ) : (
            <>
              <Text style={styles.tituloPosteos}>Posteos:</Text>
              <FlatList
                data={this.state.posts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                  <User item={item} />
                }
              />
            </>
          )
        }
      </View>
    )
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf4',
    padding: 20,
  },
  tituloBienvenida: {
    fontSize: 20,
    fontWeight: '600',
    color: '#5e4b4b',
    marginBottom: 10,
  },
  sinPosteos: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#9c8b8b',
    textAlign: 'center',
    marginTop: 50,
  },
  tituloPosteos: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7b5e57',
    marginVertical: 10,
  },
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: '#fffaf4',
  },
  textoCargando: {
    marginTop: 10,
    fontSize: 16,
    color: '#a5978e',
  },
});
