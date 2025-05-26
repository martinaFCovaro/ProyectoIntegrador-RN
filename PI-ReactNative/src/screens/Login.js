import { auth } from '../firebase/config'

class Login extends Component{
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
    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
        .then((response) => {
            this.setState({ loggedIn: true });
        })
        .catch(error => {
            this.setState({ error: 'Credenciales inválidas.' })
        })
    }

    render(){
        return(
           <></> 
        )
    }
    
}

export default Login;