import React, {Component} from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import {auth} from '../firebase/config'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.props.navigation.navigate('Tab')
            }
        })
    }
    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
        .then( response => {
            this.setState({registered: true});
         })     
        .catch( error => {
          this.setState({error: 'Fallo en el registro.'})
        })
    }
          

    render(){
        return(
           <></> 
        )
    }
    
}
export default Register;