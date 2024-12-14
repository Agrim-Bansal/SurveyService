"use client";;

import Image from "next/image";
import InputBoxCard from "@/app/ui/InputBoxCard";
import Heading from "@/app/ui/Heading";
import { useState } from "react";

export default function Home() {
  const initialQuestions = ['What is your name?', 'What is your age', 'What is A?', 'What is B?', 'What is C?', 'What is D?', 'What is E?', 'What is F?', 'What is G?', 'What is H?', 'What is I?', 'What is J?', 'What is K?', 'What is L?', 'What is M?', 'What is N?', 'What is O?', 'What is P?', 'What is Q?', 'What is R?', 'What is S?', 'What is T?', 'What is U?', 'What is V?', 'What is W?', 'What is X?', 'What is Y?', 'What is Z?'];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [questions, setQuestions] = useState(initialQuestions);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [inFocus, setInFocus] = useState(10);

  const rightQuestions = questions.slice(inFocus+1, questions.length);

  var leftElements = [];
  for (let i = 0; i < inFocus; i++) {
    leftElements.push(<InputBoxCard key={i} setQuestions={setQuestions} questions={questions} questionID={i}>{questions[i]}</InputBoxCard>);
  }
  
  var rightElements = [];
  for (let i = inFocus+1; i < questions.length; i++) {
    rightElements.push(<InputBoxCard key={i} setQuestions={setQuestions} questions={questions} questionID={i}>{questions[i]}</InputBoxCard>);
  }
  rightElements = rightElements.reverse();

  
  function addQuestionHandler(){
    var newQuestions = [...questions];
    newQuestions.splice(inFocus+1, 0, '');
    setQuestions(newQuestions);
    setInFocus(inFocus+1);
  }

  function deleteQuestionHandler(){
    var newQuestions = [...questions];
    newQuestions.splice(inFocus, 1);
    setQuestions(newQuestions);
    setInFocus(inFocus>0 ? inFocus-1 : inFocus+1);
  }

  function leftClickHandler(e){
    e.target.parentNode.classList.add('stage-from-left');
    console.log(e.target.parentNode);
    setTimeout(()=> inFocus>0 ? setInFocus(inFocus-1) : setInFocus(inFocus), 1000);
    const centerCard = document.querySelector('.stage');
    console.log(centerCard);
    centerCard.classList.add('offstage-to-right');

  }

  function rightClickHandler(e){
    e.target.parentNode.classList.add('stage-from-right');
    console.log(e.target.parentNode);
    setTimeout(()=> setInFocus(inFocus+1), 1000);
    const centerCard = document.querySelector('.stage');
    console.log(centerCard);
    centerCard.classList.add('offstage-to-left');

  }

  var Elements = <>

  <Heading>Survey App</Heading>
  
  <div className='carousel'>
  
    
    <div className="leftStack" onClick={leftClickHandler}>
        {leftElements}
    </div>
  
    <div className="centerDisplay">
      <InputBoxCard className='stage' key={inFocus} autofocus setQuestions={setQuestions} questions={questions} questionID={inFocus}>{questions[inFocus]}</InputBoxCard>
    </div>

    <div className="rightStack" onClick={rightClickHandler} >
      {rightElements}   
    </div>

  </div>

  <button onClick={addQuestionHandler} className="button border round">Add New</button>
  <button onClick={deleteQuestionHandler} className="button border round">Delete</button>
  <button onClick={()=>{console.log(questions)}} className="button border round">Submit</button>
  </>



  return (Elements);
}