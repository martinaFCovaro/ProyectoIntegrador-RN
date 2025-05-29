import { auth } from '../firebase/config'
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
        }
    }

    componentDidMount() {
auth.onAuthStateChanged(user => {
    if(user){
        this.props.navigation.navigate('Tab')
    }
})
    }

    login(email, password) {
        if (email === '' || password === '') {
            this.setState({ error: 'Por favor completar todos los campos' })
        } else {
            auth.signInWithEmailAndPassword(email, password)
                .then((response) => {
                    this.props.navigation.navigate('Tab')
                })
                .catch(error => {
                    this.setState({ error: 'Credenciales inválidas.' })
                })
        }
    }

    render() {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='Ingresá tu email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Ingresá tu contraseña'
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry={true}
                    value={this.state.password}
                />
                {this.state.error != '' && (
                    <Text> {this.state.error}</Text>
                )}
                <TouchableOpacity
                    onPress={() => this.login(this.state.email, this.state.password)}
                    style={styles.button}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
                <Text>¿Todavía no sos usuario?</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Register')}
                    style={styles.button}
                >
                    <Text>Registrarme</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default Login;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#28a745',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});
