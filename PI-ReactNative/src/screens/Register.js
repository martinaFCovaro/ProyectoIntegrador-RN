import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { auth } from '../firebase/config'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            userName: ''
        }
    }
    register(email, password) {
        console.log('Email:', email, 'Pass:', password);
        if (
            (
                email !== '' &&
                password !== ''
            )
            &&
            password.length >= 6
            &&
            email.includes('@')
        ) {
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    this.props.navigation.navigate('Tab')
                })
                .catch(error => {
                    this.setState({ error: 'Fallo en el registro.' })
                })
        }
    }



    render() {
        return (
            <View>
                <Text>Formulario de Registro</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="Email..."
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.input}
                    placeholder="User Name..."
                    onChangeText={(text) => this.setState({ userName: text })}
                    value={this.state.userName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password..."
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />

                <TouchableOpacity style={styles.button} onPress={() => this.register(this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}>Registrate</Text>
                </TouchableOpacity>
            </View>
        )
    }

}
export default Register;

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
  