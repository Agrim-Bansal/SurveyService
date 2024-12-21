
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, getDocs, setDoc, doc, collection, updateDoc, arrayUnion, query, where } from "firebase/firestore/lite";

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

export async function getSurveyFromFirestoreSecure(name, passcode){
  const surveyRef = doc(db, "survey", name);
  const docSnap = await getDoc(surveyRef);

  if (!docSnap.exists()) {
    return 'no such document';
  }else if(docSnap.data().passcode != passcode){
    return 'Incorrect passcode';
  }
  else {
    return docSnap.data();
  }
}


export async function addSurveyResponseToFirestore(surveyName, responses, userName, userEmail){
  // Add a new document with a generated id.
  const surveyRef = await doc(db, "responses", surveyName+"~"+userEmail);

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

export async function addSurveyUserToFirestore(surveyName, userEmail, userName){
  const surveyRef = await doc(db, "survey", surveyName);

  const docSnap = await getDoc(surveyRef);
  
  await updateDoc(surveyRef, {
    users : arrayUnion(userEmail+"~"+userName)
  })
  
}

export async function getSurveyResponseFromFirestore(surveyName, userEmail){
  const surveyRef = doc(db, "responses", surveyName+"~"+userEmail);
  const docSnap = await getDoc(surveyRef);

  console.log(docSnap.data());
  console.log(surveyName+"~"+userEmail);

  return docSnap.data();
}

export async function getQuestionResponseFromFirestore(surveyName, index){
  const q = query(collection(db, "responses"), where("surveyName", "==", surveyName));
  const docSnap = await getDocs(q);
  let responses = [];
  docSnap.forEach((doc) => {
    responses.push(doc.data().responses[index]);
  });
  return responses;
}