import { initializeApp } from 'firebase/app';

import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore, // Instantiate firestore instance
  doc, // Retrieve documents instance inside of firestore database
  getDoc, // Get the documnet data
  setDoc, // Set the document data
  collection, // get a collection reference
  writeBatch, // 
  query,
  getDocs,
} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCs9SQT_WQBUP8Rzvoe_VBeXXmTzUYIiGI",
    authDomain: "crwn-clothing-db-7fdb0.firebaseapp.com",
    projectId: "crwn-clothing-db-7fdb0",
    storageBucket: "crwn-clothing-db-7fdb0.appspot.com",
    messagingSenderId: "617719491194",
    appId: "1:617719491194:web:88441b4671066a7f1d29c3"
  };

  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleprovider = new GoogleAuthProvider();

  googleprovider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();  // This keeps track of the authentication state of the entire application, 
  //  which user is signed in.
  export const signInWithGoolePopup = () => signInWithPopup(auth, googleprovider);
  export const signInWithGooleRedirect = () => signInWithRedirect(auth, googleprovider);

  // Create firestore database
  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {  // Add Products Collections. Used 
    // in products.context.jsx
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db)  // Instanstiate a batch class. writeBatch() will return a batch.
    // batch allows us to attach a bunch of different actions e.g. write, delete, set etc. 
    //  Batched Writes: a batched write is a set of write operations on one or more documents.

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase())  //  doc(databse, collections, identifier or id)
      // we didn't pass db to doc() cause it has been specified in collectionRef
      batch.set(docRef, object);
    });

    await batch.commit()  //  commit the batch
    console.log('done')
  };

  export const getCategoriesAndDocuments = async () => { // Get product catgories from firestore. Used 
    // in products.context.jsx
    const collectionRef = collection(db, 'categories'); // Create a collection Reference
    const q = query(collectionRef); // Generate a query using the collectionRef. This gives some object that we 
    // can create a snapshot from. 

    const querySnapshot = await getDocs(q);  // Create query snapshot
    // getDocs() is the asynchronous ability to fetch those document snapshot that we want because 
    // now it's all encapsulated under this query snapshot
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    return categoryMap;
  }

  export const createUserDocumentFromAuth = async (  // Add user to firebase collection
    userAuth, 
    additionalInformation, 
  ) => {
    if (!userAuth) return;

    // Get a document reference
    const userDocRef = doc(db, 'users', userAuth.uid)  // doc(databse, collections, identifier or id)
    // firebase will give us a document reference even if it doesn't exist yet, 
    // it will just point to that place for this specific key/id inside of our collection

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('Error creating the user', error.message)
      }
    }

    return userDocRef;
  } 

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
      alert('Email or Password is Empty');
      return;
    }
    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => signOut(auth); // signOut() do not return any response

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback) 
  //  onAuthStateChanged returns back a listener that listen for whenever our auth changes i.e when a user 
  // sign in, or sign up.