import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Component } from "react";
import { db, auth } from "../firebase/config";

export default class Perfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            InfoUsuario: []
        }
    }

    componentDidMount() {
        db.collection("users")
            .where("owner", "==", auth.currentUser.email)
            .onSnapshot(docs => {
                let arrDocs = []
                docs.forEach(
                    (doc) => {
                        arrDocs.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    }
                )

                this.setState({
                    InfoUsuario: arrDocs
                }, () => console.log("Este es el estado", this.state))
            })
    }

    logout() {
        auth.signOut()
            .then(() => this.props.navigation.navigate('Register'))
            .catch(err => console.log('err en signout', err))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Perfil</Text>

                {
                    this.state.InfoUsuario.length > 0 ?
                        <>
                            <Text style={styles.label}>Usuario:</Text>
                            <Text style={styles.valor}>{this.state.InfoUsuario[0].data.userName}</Text>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.valor}>{this.state.InfoUsuario[0].data.owner}</Text>
                        </>
                        :
                        <Text style={styles.vacio}>Información no disponible</Text>
                }

                <TouchableOpacity style={styles.botonLogout} onPress={() => this.logout()}>
                    <Text style={styles.textoLogout}>Cerrar Sesión</Text>
                </TouchableOpacity>
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
    }
});
