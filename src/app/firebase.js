
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaUNMLNNXwGZ08sXkT8V-aJVabNQqFeAw",
  authDomain: "surveyservice-2ac91.firebaseapp.com",
  projectId: "surveyservice-2ac91",
  storageBucket: "surveyservice-2ac91.firebasestorage.app",
  messagingSenderId: "1044922643850",
  appId: "1:1044922643850:web:4c6d134d0085b49fb80473"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
export async function getQuestionsFromFirestore(questions, name){
  // Get a list of cities from your database
  const surveyRef = doc(db, "survey", name);

  await setDoc(surveyRef, {
    question: questions
  }).then(() => {
    console.log("Document written with ID: ", surveyRef.id);
  }).catch((error) => {
    console.error("Error adding document: ", error);
  });
}

export async function addNewSurveyToFirestore(name, passcode, questions){
  // Add a new document with a generated id.
  const surveyRef = doc(db, "survey", name);
  const docSnap = await getDoc(surveyRef);

  if (!docSnap.exists()) {
    
    await setDoc(surveyRef, {
      passcode: passcode,
      question: questions
    })
    console.log("Document written with ID: ", surveyRef.id);
    return 'success';
  
  }else{
    console.log('SurveyName already exists');
    return `Name already exists. Please try another name`;
  }




}