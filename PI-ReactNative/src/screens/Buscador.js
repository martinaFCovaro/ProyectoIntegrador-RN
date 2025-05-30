import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { db } from '../firebase/config'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-web';

export class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            busqueda: ""
        };
    }

    componentDidMount() {
        db.collection('posts').onSnapshot((docs) => {
            let posts = [];

            docs.forEach((doc) => {
                posts.push({ id: doc.id, data: doc.data() });
            });
            this.setState({
                posts: posts
            });
        })
    }

    filtrarBusquedas() {
        const { busqueda, posts } = this.state;
        if (busqueda === '') {
            return [];
        }
        return posts.filter((post) => {
            return (
                post.data.text &&
                post.data.text.toLowerCase().includes(busqueda.toLowerCase())
            )
        })
    }
    render() {
        const resultadosBusqueda = this.filtrarBusquedas();
        return (
            <View>
                <Text> Buscar Posts</Text>
                <TextInput
                    placeholder='Busca un post...'
                    keyboardType='default'
                    value={this.state.busqueda}
                    onChangeText={(texto) => this.setState({ busqueda: texto })}
                />
                {resultadosBusqueda.length === 0 && this.state.busqueda.trim() !== '' ? (
                    <Text> No se encontraron resultados</Text>
                ) : (
                    <FlatList
                        data={resultadosBusqueda}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Text> {item.data.text} </Text>
                        )}

                    />
                )}
                <TouchableOpacity onPress={() => this.setState({ busqueda: "" })}>
                    <Text >Limpiar búsqueda</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Buscador;