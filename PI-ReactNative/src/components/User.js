import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import firebase from "firebase";
import { db, auth } from '../firebase/config';

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
                <Text style={styles.textoComentario}>{this.props.item.data.comentario}</Text>
                <Text style={styles.textoOwner}>Creado por: {this.props.item.data.owner}</Text>
                {
                    this.state.DarLike ?
                        <TouchableOpacity
                            onPress={() => this.sacarLikemetodo(this.props.item.id)}
                            style={styles.btnlike2}
                        >
                            <Text>Sacar Like</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => this.darLikemetodo(this.props.item.id)}
                            style={styles.btnlike}
                        >
                            <Text>Dar Like</Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    btnlike: {
        backgroundColor: "red"
    },
    btnlike2: {
        backgroundColor: "blue"
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
    }
});
export default User;