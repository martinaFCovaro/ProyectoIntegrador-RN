import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/config';

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
        });
    }

    filtrarBusquedas() {
        const { busqueda, posts } = this.state;
        if (busqueda === '') {
            return [];
        }
        return posts.filter((post) => {
            return (
                post.data.comentario &&
                post.data.comentario.toLowerCase().includes(busqueda.toLowerCase())
            );
        });
    }

    render() {
        const resultadosBusqueda = this.filtrarBusquedas();

        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Buscar Posts</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Ingresa tu busqueda...'
                    keyboardType='default'
                    value={this.state.busqueda}
                    onChangeText={(texto) => this.setState({ busqueda: texto })}
                    placeholderTextColor="#b49c9c"
                />

                {resultadosBusqueda.length === 0 && this.state.busqueda.trim() !== '' ? (
                    <Text style={styles.noResultados}>No se encontraron resultados</Text>
                ) : (
                    <FlatList
                        data={resultadosBusqueda}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.post}>
                                <Text style={styles.textoComentario}>Post: {item.data.comentario}</Text>
                                <Text style={styles.textoOwner}>Creado por: {item.data.owner}</Text>
                            </View>
                        )}
                    />
                )}

                <TouchableOpacity style={styles.botonLimpiar} onPress={() => this.setState({ busqueda: "" })}>
                    <Text style={styles.textoLimpiar}>Limpiar búsqueda</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Buscador;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffaf4',
        padding: 20,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#5e4b4b',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#decfcf',
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#fcefe8',
        color: '#4b3d3d',
        marginBottom: 15
    },
    post: {
        backgroundColor: '#fcefe8',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    textoComentario: {
        fontSize: 16,
        color: '#4b3d3d',
        marginBottom: 6,
    },
    textoOwner: {
        fontSize: 14,
        color: '#7b6f63',
        fontStyle: 'italic',
    },
    noResultados: {
        fontSize: 16,
        color: '#a5978e',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 20
    },
    botonLimpiar: {
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: '#d9a5b3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    textoLimpiar: {
        color: '#fffaf4',
        fontWeight: '600',
        fontSize: 14
    }
});
