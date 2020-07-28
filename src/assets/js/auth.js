import firebase from './firebase.setup.js';
const errorElement = document.createElement('small');
const restaurantPath = '/src/pages/restaurant.html';
const newAccount = document.querySelector('.newAccount');

//
newAccount.addEventListener('click', createAccount);
async function createAccount(){
    try {
        const email = document.querySelector('.login input[type="email"]').value;
        const password = document.querySelector('.login input[type="password"]').value;
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        errorElement.setAttribute('class', 'error text-success');
        errorElement.innerText = 'account created';
        document.querySelector('.login').appendChild(errorElement);   
        window.location.href=restaurantPath;
    } catch (error) {
        errorElement.setAttribute('class', 'error text-danger');
        errorElement.innerText = error.message;
        document.querySelector('.login').appendChild(errorElement);
    }
}
async function authWithFirebase({email, password }){
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
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

