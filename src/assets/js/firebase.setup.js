import { firebaseConfig } from './firebase.config.js';

//initialize app
const setup = firebase.initializeApp(firebaseConfig);
export default setup;