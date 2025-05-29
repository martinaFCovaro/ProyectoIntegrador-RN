import { Component } from "react";
import { auth } from '../firebase/config';

class Perfil extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    logout() {
        auth.signOut()
            .then(() => this.props.navigation.navigate('Register'))
            .catch(err => console.log('err en signout', err))
    }
    render() {
        return (

<></>

       
        )
    }




}
export default Perfil;