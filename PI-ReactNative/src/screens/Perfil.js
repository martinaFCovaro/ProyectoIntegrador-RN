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
            <View>
                <Text>PERFI3LL</Text>
                <Text>
                    {
                    this.state.InfoUsuario.length > 0
                    ?
                    <Text>{this.state.InfoUsuario[0].data.userName}</Text>
                    :
                    "vacio"
                    }</Text>
            </View>
        )
    }

}
