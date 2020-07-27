import firebase from './firebase.setup.js';
const errorElement = document.createElement('small');
const restaurantPath = '/src/pages/restaurant.html';
async function createAccount({email, password}){
    await firebase.auth().createUserWithEmailAndPassword(email, password);
}
async function authWithFirebase({email, password }){
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password);
        window.location.href=restaurantPath;
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

