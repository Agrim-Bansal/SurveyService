
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
  }).catch((error) => {
  });
}

export async function addNewSurveyToFirestore(name, passcode, questions){
  // Add a new document with a generated id.
  const surveyRef = await doc(db, "survey", name);
  const docSnap = await getDoc(surveyRef);

  if (!docSnap.exists()) {
    
    await setDoc(surveyRef, {
      passcode: passcode,
      questions: questions
    })
    return 'success';
  
  }else{
    return `Name already exists. Please try another name`;
  }
}

export async function forceAddNewSurveyToFirestore(name, passcode, questions){
  // Add a new document with a generated id.
  const surveyRef = await doc(db, "survey", name);
  const docSnap = await getDoc(surveyRef);
  await setDoc(surveyRef, {
    passcode: passcode,
    questions: questions
  })
  return 'success';
}


export async function getSurveyFromFirestore(name){
  const surveyRef = doc(db, "survey", name);
  const docSnap = await getDoc(surveyRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return 'no such document';
  }
}

export async function addSurveyResponseToFirestore(surveyName, responses, userName, userEmail){
  // Add a new document with a generated id.
  const surveyRef = await doc(db, "responses", userEmail+"~"+surveyName);

  const docSnap = await getDoc(surveyRef);

  if (docSnap.exists()) {
    return 'already exists';
  }else{
    await setDoc(surveyRef, {
      userName: userName,
      userEmail: userEmail,
      surveyName: surveyName,
      responses: responses
    })  
  
    return 'success';
  }
}

export async function getSurveyResponseFromFirestore(name){
  const surveyRef = doc(db, "responses", "Bansal~demo");
  const docSnap = await getDoc(surveyRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return 'no such document';
  }
}