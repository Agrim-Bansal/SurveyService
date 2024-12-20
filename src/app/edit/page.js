"use client";;
import InputBoxCard from "@/app/ui/InputBoxCard";
import Heading from "@/app/ui/Heading";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from 'clsx'; 
import { getSurveyFromFirestore, forceAddNewSurveyToFirestore } from "@/app/firebase";

export default function Edit() {
    const searchParams = useSearchParams();
     
    
    const [questions, setQuestions] = useState(['']);
    const [inFocus, setInFocus] = useState(0);
    const [code, setCode] = useState('');
    const [finalLoading, setFinalLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [passwordCorrect, setPasswordCorrect] = useState(true);
    const [documentFound, setDocumentFound] = useState(true);

    useEffect(()=>{
        getSurveyFromFirestore(searchParams.get("surveyName"))
        .then((response)=>{
            const data = response;
            
            if (data=='no such document'){
                console.log('Hey document not found');
                setDocumentFound(false);
            }else if(data['passcode'] != searchParams.get('password')){
                setPasswordCorrect(false);
            }else{
                setQuestions(data['questions']);
                setInFocus(data['questions'].length-1);
                console.log(questions);
            }

            // console.log(data);
    });

    },[searchParams]);



    var leftElements = [];
    if (inFocus > 0) {
        for (let i = 0; i < inFocus; i++) {
        leftElements.push(<InputBoxCard key={questions.length*10000 + i} className="left" setQuestions={setQuestions} questions={questions} questionID={i} onClick={leftClickHandler} totalQuestions={questions.length}>{questions[i]}</InputBoxCard>);
        }
    }

    var centerElement = <InputBoxCard key={questions.length*10000 + inFocus} className="center" setQuestions={setQuestions} questions={questions} questionID={inFocus} totalQuestions={questions.length} autoFocus={true}>{questions[inFocus]}</InputBoxCard>;

    var rightElements = [];
    for (let i = inFocus+1; i < questions.length; i++) {
        rightElements.push(<InputBoxCard key={questions.length*10000 + i} className="right" setQuestions={setQuestions} questions={questions} questionID={i} onClick={rightClickHandler} totalQuestions={questions.length}>{questions[i]}</InputBoxCard>);
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

    function addQuestionHandler(){
        var newQuestions = [...questions];
        newQuestions.splice(inFocus+1, 0, '');

        document.querySelector('.center').classList.add('left');
        document.querySelector('.center').classList.remove('center');
        
        setTimeout(() => {
        setQuestions(newQuestions);
        setInFocus(inFocus+1);}, 500);
    }


    function deleteQuestionHandler(){

        var newQuestions = [...questions];

        if(questions.length===1){
        setQuestions(['']);
        setInFocus(0);
        return false;
        }else{
        newQuestions.splice(inFocus, 1);
        }

        document.querySelector(`#q${inFocus}`).classList.add('minimize');
        document.querySelector(`#q${inFocus}`).classList.remove('center');
        
        if(inFocus>0){
        document.querySelector(`#q${inFocus-1}`).classList.add('center');
        document.querySelector(`#q${inFocus-1}`).classList.remove('left');
        setTimeout(()=>{
            setQuestions(newQuestions);
            setInFocus(inFocus-1);
        }, 1000)
        }else{
        document.querySelector('#q1').classList.add('center');
        document.querySelector('#q1').classList.remove('right');
        setTimeout(()=>{
            setQuestions(questions.slice(1, questions.length));
            setInFocus(0);
        }, 1000)

        }
        
    }

    function questionSubmitHandler(){
        setFinalLoading(true);
    }

    async function confirmHandler(){

        document.querySelector('.loader-container').classList.remove('hidden');
        
        const response = await forceAddNewSurveyToFirestore(searchParams.get('surveyName'), code, questions)
    

        if(response=='success'){
        document.querySelector('.message').classList.add('success');
        document.querySelector('.message').classList.remove('error');
        setMessage('Survey Updated Successfully. Redirection to main site in 10 seconds...');
        setTimeout(()=>{window.location.href = '/';}, 10000);
        } else if(response == 'Name already exists. Please try another name'){
        document.querySelector('.message').classList.add('error');
        document.querySelector('.message').classList.remove('success');
        setMessage(response);
        }
        else{
        setMessage(response);
        }
        
        document.querySelector('.loader-container').classList.add('hidden');
    }



    var Elements = 
    <>

    <div className="heading-changeable">{searchParams.get('surveyName')}</div>
    
    <div className='carousel'>
        {leftElements}
        {centerElement}
        {rightElements}   
    </div>

    <div className="buttonContainer">
        <button onClick={addQuestionHandler} className="button">Add New</button>

        {
        questions.length>1 ? 
        <button onClick={deleteQuestionHandler} className="button">Delete</button> :
        <button className="button disabled">Delete</button>
        }
        
        <button onClick={questionSubmitHandler} className="button">Change</button>
    </div>
    
    <div className={clsx('promptbackdrop', 
        {'hidden' : !finalLoading},
    )}>

        <div className="promptbox card ">

        <div className="flex w-full justify-center items-center">
            <div className="inputLabel w-max flex items-center">Change the secret code</div>
            <input type="password" onChange={(e)=>setCode(e.target.value)} className="codeInput code"/>
        </div>
            <div className="small message">{message}</div>

        <div className="flex">
            <button onClick={()=>setFinalLoading(false)} className="button">Go Back</button>
            <button onClick={confirmHandler} className="button">Confirm</button>
        </div>
        </div>
    </div>
    

    <div className="promptbackdrop loader-container hidden">    

    <div className="loader"></div>

    </div> 

    <div className={clsx('promptbackdrop', 
        {'hidden' : (passwordCorrect && documentFound)},
    )}>

        <div className="promptbox card ">

        <div className="flex w-full justify-center items-center">
            <div className="inputLabel w-max flex items-center error">{
                !passwordCorrect ? 'Incorrect Password' : 'Document Not Found'
                }</div>
        </div>

        </div>
    </div>


    </>


    return (Elements);
}