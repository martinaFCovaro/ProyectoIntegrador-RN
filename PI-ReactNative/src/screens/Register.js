import {auth} from '../firebase/config'

register(email, pass)
    auth.createUserWithEmailAndPassword(email, pass)
     .then( response => {
         this.setState({registered: true});
      })     
     .catch( error => {
       this.setState({error: 'Fallo en el registro.'})
     })