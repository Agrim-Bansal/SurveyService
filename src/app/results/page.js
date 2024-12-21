"use client";;
import ResponseInputBoxCard from "@/app/ui/ResponseInputBoxCard";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from 'clsx'; 
import { getSurveyResponseFromFirestore, getSurveyFromFirestore, forceAddNewSurveyToFirestore } from "@/app/firebase";


export default function Results() {
    const initialQuestions = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];
    const initialResponses = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];

    const params = useSearchParams();
    const [questions, setQuestions] = useState(initialQuestions);
    const [responses, setResponses] = useState(initialResponses);
    const [inFocus, setInFocus] = useState(0);






    var leftElements = [];
    if (inFocus > 0) {
        for (let i = 0; i < inFocus; i++) {
        leftElements.push(<ResponseInputBoxCard key={questions.length*10000 + i} className="left" setQuestions={setQuestions} questions={questions} questionID={i} onClick={leftClickHandler} totalQuestions={questions.length} responses={responses} setResponses={setResponses}>{questions[i]}</ResponseInputBoxCard>);
        }
    }

    var centerElement = <ResponseInputBoxCard key={questions.length*10000 + inFocus} className="center" setQuestions={setQuestions} questions={questions} questionID={inFocus} totalQuestions={questions.length} autoFocus={true} responses={responses} setResponses={setResponses}>{questions[inFocus]}</ResponseInputBoxCard>;

    var rightElements = [];
    for (let i = inFocus+1; i < questions.length; i++) {
        rightElements.push(<ResponseInputBoxCard key={questions.length*10000 + i} className="right" setQuestions={setQuestions} questions={questions} questionID={i} onClick={rightClickHandler} totalQuestions={questions.length} responses={responses} setResponses={setResponses}>{questions[i]}</ResponseInputBoxCard>);
    }
    rightElements = rightElements.reverse();

    function leftClickHandler(e){
        const centerCard = document.querySelector('.center');
        centerCard.classList.add('right');
        centerCard.classList.remove('center');

        e.target.parentNode.classList.remove('left');
        e.target.parentNode.classList.add('center');

        setTimeout(()=> inFocus>0 ? setInFocus(inFocus-1) : setInFocus(inFocus), 500);
    }

    function rightClickHandler(e){
        const centerCard = document.querySelector('.center');
        centerCard.classList.add('left');
        centerCard.classList.remove('center');

        e.target.parentNode.classList.remove('right');
        e.target.parentNode.classList.add('center');

        setTimeout(()=> inFocus<questions.length-1 ? setInFocus(inFocus+1) : setInFocus(inFocus), 500);
    }


    const Elements = <>
        <div className="heading-changeable">{params.get('surveyName')}</div>

        <div className="sort-options-container flex w-full justify-center">
            <div className="button">Sort by Questions</div>
            <div className="button">Sort by Users</div>
        </div>

        <div className="options-scroll flex">
            <div className="option">Option 1</div>
            <div className="option">Option 2</div>
            <div className="option">Option 3</div>
            <div className="option">Option 4</div>
            <div className="option">Option 5</div>
            <div className="option">Option 6</div>  
            <div className="option">Option 7</div>
            <div className="option">Option 8</div>
            <div className="option">Option 9</div>
            <div className="option">Option 10</div>
            <div className="option">Option 11</div>
            <div className="option">Option 12</div>
            <div className="option">Option 13</div>
            <div className="option">Option 14</div>
            <div className="option">Option 15</div>
            <div className="option">Option 16</div>
        </div>

    <div className='carousel'>
        {leftElements}
        {centerElement}
        {rightElements}   
    </div>

    </>

    return Elements;
}