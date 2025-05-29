import { auth } from '../firebase/config'
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: ''

        }
    }

    login(email, pass) {
        auth.signInWithEmailAndPassword(email, pass)
            .then((response) => {
                this.props.navigation.navigate('Tab')
            })
            .catch(error => {
                this.setState({ error: 'Credenciales inválidas.' })
            })
    }

    render() {
        return (
            <Text>hola</Text>
        )
    }

}

export default Login;