// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";  


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
//your db config
};

const addCustomer = (userId, name, email, imageUrl) => {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl
  });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
export { addCustomer };

