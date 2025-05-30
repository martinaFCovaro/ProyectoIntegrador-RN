import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Component } from "react";
import { db, auth } from "../firebase/config";
import { FlatList } from 'react-native-web';

export default class Perfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            InfoUsuario: [],
            misposts: []
        }
    }

    componentDidMount() {
        db.collection("users")
            .where("owner", "==", auth.currentUser.email)
            .onSnapshot(docs => {
                let arrDocs = [];
                docs.forEach(doc => {
                    arrDocs.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({ InfoUsuario: arrDocs });
            });

        db.collection("posts")
            .where("owner", "==", auth.currentUser.email)
            .onSnapshot(docs => {
                let posteos = [];
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({ misposts: posteos });
            });
    }

    logout() {
        auth.signOut()
            .then(() => this.props.navigation.navigate('Register'))
            .catch(err => console.log('err en signout', err))
    }

    borrarPost(idDoc) {
        db
            .collection('posts')
            .doc(idDoc)
            .delete()
            .then(() => {
                console.log('Post eliminado');
            })
            .catch(err => console.log('Error al eliminar post:', err));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Mi Perfil</Text>

                {this.state.InfoUsuario.length > 0 ? (
                    <>
                        <Text style={styles.label}>Usuario:</Text>
                        <Text style={styles.valor}>{this.state.InfoUsuario[0].data.userName}</Text>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.valor}>{this.state.InfoUsuario[0].data.owner}</Text>
                        <Text style={styles.tituloPosteos} >Mis posteos:</Text>

                        {this.state.misposts.length === 0 ? (
                            <Text style={styles.vacio}>No tenés posteos aún</Text>
                        ) : (
                            <FlatList
                                data={this.state.misposts}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.posteoContainer}>
                                        <Text style={styles.textoComentario}>{item.data.comentario}</Text>
                                        <TouchableOpacity
                                            onPress={() => this.borrarPost(item.id)}
                                            style={styles.botonEliminar}
                                        >
                                            <Text style={styles.textoBotonEliminar}>Eliminar</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        )}
                    </>
                ) : (
                    <Text style={styles.vacio}>Información no disponible</Text>
                )}

                <TouchableOpacity style={styles.botonLogout} onPress={() => this.logout()}>
                    <Text style={styles.textoLogout}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffaf4',
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5e4b4b',
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        color: '#7b5e57',
        marginTop: 10,
    },
    valor: {
        fontSize: 18,
        fontWeight: '500',
        color: '#4b3d3d',
    },
    vacio: {
        fontSize: 16,
        color: '#9c8b8b',
        fontStyle: 'italic',
        marginVertical: 20,
    },
    botonLogout: {
        backgroundColor: '#f4d6d6',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 30,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
    },
    textoLogout: {
        color: '#5e4b4b',
        fontSize: 16,
        fontWeight: '600'
    },
    posteoContainer: {
        backgroundColor: '#fcefe8',
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
        width: 280,
        alignItems: 'center'
    },
    textoComentario: {
        fontSize: 16,
        color: '#4b3d3d',
        marginBottom: 10,
        textAlign: 'center'
    },
    botonEliminar: {
        backgroundColor: '#eed3d9',
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 6,
        marginTop: 5
    },
    textoBotonEliminar: {
        color: '#5e4b4b',
        fontWeight: '600'
    },
    tituloPosteos: {
        fontSize: 18,
        fontWeight: '600',
        color: '#5e4b4b',
        marginTop: 25,
        marginBottom: 10,
        textAlign: 'center'
    }
});
