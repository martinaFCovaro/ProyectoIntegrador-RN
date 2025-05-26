import { auth } from '../firebase/config'

login(email, pass)
auth.signInWithEmailAndPassword(email, pass)
    .then((response) => {
        this.setState({ loggedIn: true });
    })
    .catch(error => {
        this.setState({ error: 'Credenciales inválidas.' })
    })
