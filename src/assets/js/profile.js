import firebase from './firebase.setup.js';

const form = document.querySelector('.update-profile form');
const error = document.createElement('small');
form.addEventListener('submit', function(e){
    e.preventDefault();
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            updateProfile();
        }else{
         error.setAttribute('class', 'text-danger');
         error.innerText='you must be authenticated.';
         form.appendChild(error);
        }
    });
});

const updateProfile = async ()=>{
    try {
        const className = '.update-profile form';
        const email = document.querySelector(`${className} input[name="email"]`).value;
        const password = document.querySelector(`${className} input[name="password"]`).value;
        const user = firebase.auth().currentUser;
        await user.updateEmail(email);
        await user.updatePassword(password);
        error.setAttribute('class', 'text-success');
         error.innerText='email & password updated successfully.';
         form.appendChild(error);
    } catch (error) {
        error.setAttribute('class', 'text-danger');
         error.innerText='something wrong try again later.';
         form.appendChild(error);
    }
    
};

const findCurrentUser = ()=>{
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            const className = '.update-profile form';
            const email = document.querySelector(`${className} input[name="email"]`);
            email.value = user.email;
        }else{
         error.setAttribute('class', 'text-danger');
         error.innerText='you must be authenticated.';
         form.appendChild(error);
        }
    });
}

findCurrentUser();