import firebase from './firebase.setup.js';
const errorElement = document.createElement('small');
const firestore = firebase.firestore();

function clearItems(){
    document.querySelector('.display').innerHTML="";
}
async function viewRestaurant(){
    clearItems();
    try {
        const find = await firestore.collection('restaurants').get();
        const row = document.createElement('row');
        row.setAttribute('class', 'row');
        find.forEach((item)=>{
            const col = document.createElement('div');
            const card = document.createElement('div');
            const cardBody = document.createElement('div');
            const cardTitle = document.createElement('div');
            const cardDescription = document.createElement('p');
            const link = document.createElement('a');
            link.setAttribute('href', '#');
            link.setAttribute('item-id', `${item.id}`);
            link.setAttribute('class', 'card-link btn btn-danger');
            link.addEventListener('click', deleteRestaurant);
            col.setAttribute('class', 'col-md-12');
            card.setAttribute('class', 'card');
            card.setAttribute('style', 'margin-top: 1rem');
            cardBody.setAttribute('class', 'card-body');
            cardTitle.setAttribute('class', 'card-title');
            cardDescription.setAttribute('class', 'card-text');
            cardTitle.innerText=item.data().name;
            cardDescription.innerText=item.data().description;
            link.innerText='trash';
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            cardBody.appendChild(link);
            card.appendChild(cardBody);
            col.appendChild(card);
            row.appendChild(col);
        });
        document.querySelector('.view-restaurant .display').appendChild(row);
    } catch (error) {
        errorElement.setAttribute('class', 'error text-danger text-center');
        errorElement.innerText = 'something wrong try again later';
        document.querySelector('.view-restaurant .display').appendChild(errorElement);
    }
}


async function addRestaurant({name, description, user}){
    try {
       await firestore.collection('restaurants').add({name, description, user });
       await viewRestaurant();
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
            const name=document.querySelector('.restaurant-form form input[name="name"]');
            const description=document.querySelector('.restaurant-form form textarea[name="description"]');
            addRestaurant({name: name.value, description: description.value, user: user.l});
            name.value='';
            description.value='';
        }else{
            errorElement.setAttribute('class', 'error text-danger');
            errorElement.innerText = 'login to continue';
            document.querySelector('.restaurant-form').appendChild(errorElement);
        }
    })
});
async function deleteRestaurant(e){
    const doc = e.currentTarget.getAttribute('item-id');

    firebase.auth().onAuthStateChanged(async function(user){
        if(user){
            await firestore.collection('restaurants').doc(doc).delete();
            clearItems();
            await viewRestaurant(); 
        }else{
            errorElement.setAttribute('class', 'error text-danger text-center');
            errorElement.innerText = 'something wrong try again later';
            document.querySelector('.view-restaurant .display').appendChild(errorElement);
        }
    });
}

viewRestaurant();