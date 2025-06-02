import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import firebase from "firebase";
import { db, auth } from '../firebase/config';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            DarLike: false,
        }
    }
    componentDidMount() {
        if (this.props.item.data.likes.includes(auth.currentUser.email)) {
            this.setState({ DarLike: true });
        }
    }
    darLikemetodo(idDoc) {
        db
            .collection('posts')
            .doc(idDoc)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => {
                this.setState({
                    DarLike: true
                })
            })
    }
    sacarLikemetodo(idDoc) {
        db
            .collection('posts')
            .doc(idDoc)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => {
                this.setState({
                    DarLike: false
                })
            })
    }
    render() {
        return (
            <View style={styles.post}>
                <Text style={styles.textoComentario}><AntDesign name="message1" size={24} color="black" /> {this.props.item.data.comentario}</Text>
                <Text style={styles.textoOwner}><AntDesign name="user" size={24} color="black" /> Creado por: {this.props.item.data.owner}</Text>
                <Text style={styles.textoLikes}><FontAwesome5 name="hand-holding-heart" size={24} color="black" /> {this.props.item.data.likes.length} me gusta</Text>
                {
                    this.state.DarLike ?
                        <TouchableOpacity
                            onPress={() => this.sacarLikemetodo(this.props.item.id)}
                            style={styles.btnlike2}
                        >
                            <Text>Sacar Like</Text>
                            <Ionicons name="heart-dislike" size={24} color="black" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => this.darLikemetodo(this.props.item.id)}
                            style={styles.btnlike}
                        >
                            <Text>Dar Like</Text>
                            <FontAwesome5 name="heart" size={24} color="black" />
                        </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress={() => this.props.borrarPost(this.props.item.id)}
                    style={styles.botonEliminar}
                >
                    <Text style={styles.textoBotonEliminar}>Eliminar</Text>
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btnlike: {
        backgroundColor: '#eed3d9',
        padding: 8,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 6,
        width: 150
    },
    btnlike2: {
        backgroundColor: '#d4b0a4',
        padding: 8,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 6,
        width: 150,
    },
    post: {
        backgroundColor: '#fcefe8',
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
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
    textoLikes: {
        fontSize: 14,
        color: '#a47179',
        marginTop: 4,
        marginBottom: 8,
    },
    botonEliminar: {
        backgroundColor: '#d9a5b3',
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 6,
        marginTop: 5,
        width: 150,
        alignItems: 'center'
    },
    textoBotonEliminar: {
        color: '#fffaf4',
        fontWeight: '600'
    }
});
export default User;