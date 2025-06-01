import { auth } from '../firebase/config'
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Tab')
            }
        })
    }

    login(email, password) {
        if (
            email !== '' &&
            password !== '' &&
            password.length >= 6 &&
            email.includes('@')
        ) {
            this.setState({ loading: true, error: '' })
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    this.setState({ loading: false });
                    this.props.navigation.navigate('Tab')
                })
                .catch(error => {
                    this.setState({ error: 'Credenciales inválidas.', loading: false })
                })
        } else {
            this.setState({ error: 'Todos los campos son obligatorios y la contraseña debe tener al menos 6 caracteres...' })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#a47179" />
                        <Text style={styles.textoCargando}>Iniciando sesión...</Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.titulo}>Iniciar Sesión</Text>

                        <TextInput
                            style={styles.input}
                            keyboardType='email-address'
                            placeholder='Ingresá tu email'
                            onChangeText={text => this.setState({ email: text })}
                            value={this.state.email}
                            placeholderTextColor="#b49c9c"
                        />
                        <TextInput
                            style={styles.input}
                            keyboardType='default'
                            placeholder='Ingresá tu contraseña'
                            onChangeText={text => this.setState({ password: text })}
                            secureTextEntry={true}
                            value={this.state.password}
                            placeholderTextColor="#b49c9c"
                        />

                        {this.state.error !== '' && (
                            <Text style={styles.error}>{this.state.error}</Text>
                        )}

                        <TouchableOpacity
                            onPress={() => this.login(this.state.email, this.state.password)}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Ingresar</Text>
                        </TouchableOpacity>

                        <Text style={styles.textoSecundario}>¿Todavía no sos usuario?</Text>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Register')}
                            style={styles.buttonSecundario}
                        >
                            <Text style={styles.buttonTextSecundario}>Registrarme</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        )
    }
}

export default Login;

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
        textAlign: 'center',
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
    },
    buttonText: {
        color: '#fffaf4',
        fontWeight: '600',
        fontSize: 16,
    },
    textoSecundario: {
        marginTop: 25,
        textAlign: 'center',
        fontSize: 14,
        color: '#7b6f63',
    },
    buttonSecundario: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d9a5b3',
        alignItems: 'center',
    },
    buttonTextSecundario: {
        color: '#d9a5b3',
        fontWeight: '600',
        fontSize: 14,
    },
    error: {
        color: '#b03c3c',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center'
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoCargando: {
        marginTop: 10,
        fontSize: 16,
        color: '#a5978e',
    },
});

