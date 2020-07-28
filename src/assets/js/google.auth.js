
const restaurantPath = '/src/pages/restaurant.html';
const errorElement = document.createElement('small');
async function signInWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result){
       window.location.href=restaurantPath;
   }).catch(function(error){
    errorElement.setAttribute('class', 'error text-danger');
    errorElement.innerText = error.message;
    document.querySelector('.login').appendChild(errorElement);
   });
};