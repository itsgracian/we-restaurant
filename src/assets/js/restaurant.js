import firebase from './firebase.setup.js';
const errorElement = document.createElement('small');
const firestore = firebase.firestore();
async function addRestaurant({name, description, user}){
    try {
        const save = await firestore.collection('restaurants').doc().set({name, description, user });
        console.log(save);
    } catch (error) {
        errorElement.setAttribute('class', 'error text-danger');
        errorElement.innerText = 'something wrong try again later';
        document.querySelector('.restaurant-form').appendChild(errorElement);
    }
}
document.querySelector('.restaurant-form form').addEventListener('submit', function(e){
    e.preventDefault();
    //check if user is authenticated
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            //added restaurant
            const name=document.querySelector('.restaurant-form form input[name="name"]').value;
            const description=document.querySelector('.restaurant-form form textarea[name="description"]').value;
            addRestaurant({name, description, user: user.l})
        }else{
            errorElement.setAttribute('class', 'error text-danger');
            errorElement.innerText = 'login to continue';
            document.querySelector('.restaurant-form').appendChild(errorElement);
        }
    })
});