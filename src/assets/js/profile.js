import firebase from './firebase.setup.js';

const form = document.querySelector('.update-profile form');
const error = document.createElement('small');
const deleteBtn = document.querySelector('.update-profile form .deleteAccount');
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
// delete account
deleteBtn.addEventListener('click', (e)=> deleteMyAccount(e));
const updateProfile = async ()=>{
    try {
        const className = '.update-profile form';
        const email = document.querySelector(`${className} input[name="email"]`).value;
        const password = document.querySelector(`${className} input[name="password"]`);
        const user = firebase.auth().currentUser;
        await user.updateEmail(email);
        await user.updatePassword(password.value);
        password.value = '';
        error.setAttribute('class', 'text-success');
         error.innerText='email & password updated successfully.';
         form.appendChild(error);
    } catch (error) {
        error.setAttribute('class', 'text-danger');
         error.innerText='something wrong try again later.';
         form.appendChild(error);
    }
    
};
const deleteMyAccount = async (e)=>{
    e.preventDefault();
    try {
        let userInfo = firebase.auth().currentUser;
        if(userInfo){
            await userInfo.delete();
            error.setAttribute('class', 'text-success');
            error.innerText='your account was deleted successfully.';
            form.appendChild(error);
        }
    } catch (error) {
        error.setAttribute('class', 'text-danger');
        error.innerText='something wrong try again later.';
        form.appendChild(error);
    }
}
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