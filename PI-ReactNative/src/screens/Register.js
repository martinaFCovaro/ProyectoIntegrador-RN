import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from 'react-native'
import { auth, db } from '../firebase/config'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            userName: '',
            error: '',
            loading: false
        }
    }

    register(email, password, userName) {
        if (
            email !== '' &&
            password !== '' &&
            password.length >= 6 &&
            email.includes('@')
        ) {
            this.setState({ loading: true, error: '' });

            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    auth.signOut()
                        .then(() => {
                            db.collection('users').add({
                                owner: email,
                                createrAt: Date.now(),
                                updatedAt: Date.now(),
                                userName: userName
                            })
                                .then(() => {
                                    this.setState({ error: '', loading: false });
                                    this.props.navigation.navigate('Login');
                                })
                                .catch(error => {
                                    this.setState({ error: error.message, loading: false });
                                });
                        })
                        .catch(error => {
                            this.setState({ error: 'Error al cerrar sesión', loading: false });
                        });
                })
                .catch(error => {
                    this.setState({ error: error.message, loading: false });
                });
        } else {
            this.setState({
                error: 'Todos los campos son obligatorios y la contraseña debe tener al menos 6 caracteres...'
            });
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.cargando}>
                    <ActivityIndicator size="large" color="#a47179" />
                    <Text style={styles.textoCargando}>Registrando usuario...</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Crear Cuenta</Text>

                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="Email..."
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                    placeholderTextColor="#b49c9c"
                />

                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder="Nombre de usuario..."
                    onChangeText={(text) => this.setState({ userName: text })}
                    value={this.state.userName}
                    placeholderTextColor="#b49c9c"
                />

                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder="Contraseña..."
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                    placeholderTextColor="#b49c9c"
                />

                {this.state.error !== '' && (
                    <Text style={styles.error}>{this.state.error}</Text>
                )}

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.register(this.state.email, this.state.password, this.state.userName)}
                >
                    <Text style={styles.buttonText}>Registrate</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.link}>¿Ya tenés cuenta? Ir al Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffaf4',
        padding: 30,
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5e4b4b',
        marginBottom: 30,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#decfcf',
        marginBottom: 15,
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#fcefe8',
        color: '#4b3d3d'
    },
    button: {
        backgroundColor: '#d9a5b3',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fffaf4',
        fontWeight: '600',
        fontSize: 16,
    },
    link: {
        marginTop: 20,
        color: '#a47179',
        fontSize: 14,
        textAlign: 'center',
    },
    error: {
        color: '#b03c3c',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center'
    },
    cargando: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffaf4',
    },
    textoCargando: {
        marginTop: 10,
        fontSize: 16,
        color: '#a5978e',
    },
});
