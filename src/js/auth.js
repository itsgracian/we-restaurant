import { firebaseConfig } from './firebase.config.js';
const errorElement = document.createElement('small');

//initialize app
firebase.initializeApp(firebaseConfig);
async function authWithFirebase({email, password }){
    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const { user } = res;
        localStorage.setItem('restaurant_auth_token', user.xa);
    } catch (error) {
        errorElement.setAttribute('class', 'error text-danger');
        errorElement.innerText = error.message;
        document.querySelector('.login').appendChild(errorElement);
    }
}
document.querySelector('.login').addEventListener('submit',function(e){
    e.preventDefault();
    const email = document.querySelector('.login input[type="email"]').value;
    const password = document.querySelector('.login input[type="password"]').value;
    authWithFirebase({email, password});
});
