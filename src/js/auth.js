const errorElement = document.createElement('small');
const firebaseConfig = {
    apiKey: "AIzaSyDQEr5YcY033ZeamovNA08XPzsZLy-ZEGI",
    authDomain: "werestaurant-eca68.firebaseapp.com",
    databaseURL: "https://werestaurant-eca68.firebaseio.com",
    projectId: "werestaurant-eca68",
    storageBucket: "werestaurant-eca68.appspot.com",
    messagingSenderId: "830770275559",
    appId: "1:830770275559:web:4b94726cc3587356b0ae42"
};
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
