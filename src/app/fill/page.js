"use client";;
import ResponseInputBoxCard from "@/app/ui/ResponseInputBoxCard";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from 'clsx'; 
import { getSurveyFromFirestore, addSurveyResponseToFirestore, addSurveyUserToFirestore } from "@/app/firebase";


export default function Fill() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [questions, setQuestions] = useState(['']);
    const [responses, setResponses] = useState(['']);
    const [inFocus, setInFocus] = useState(0);
    const [finalLoading, setFinalLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [documentFound, setDocumentFound] = useState(true);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(()=>{
        if (searchParams.get("surveyName") == ""){
            setDocumentFound(false);
            return;
        }

        getSurveyFromFirestore(searchParams.get("surveyName"))
        .then((response)=>{
            const data = response;
            
            if (data=='no such document'){
                console.log('Hey document not found');
                setDocumentFound(false);
            }else{
                setQuestions(data['questions']);
                console.log(questions);
            }

            // console.log(data);
    });
    },[searchParams]);



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

    function questionSubmitHandler(){
        setFinalLoading(true);
    }

    async function confirmHandler(){

        document.querySelector('.loader-container').classList.remove('hidden');
        
        const response = await addSurveyResponseToFirestore(searchParams.get('surveyName'), responses, userName, userEmail);
        
        if(response=='success'){
            document.querySelector('.message').classList.add('success');
            document.querySelector('.message').classList.remove('error');
            setMessage('Survey Submitted Successfully. Redirection to main site in 5 seconds...');

            addSurveyUserToFirestore(searchParams.get('surveyName'), userEmail, userName);
            
            setTimeout(()=>{window.location.href = '/';}, 5000);
        }else if(response=='already exists'){
            setMessage('You have already submitted a response to this survey');
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
        <button onClick={questionSubmitHandler} className="button">Submit Response</button>
    </div>
    
    <div className={clsx('promptbackdrop', 
        {'hidden' : !finalLoading},
    )}>

        <div className="promptbox card ">

        <div className="flex w-full justify-center items-center">
            <div className="inputLabel w-max flex items-center">Name</div>
            <input type="email" onChange={(e)=>setUserName(e.target.value)} className="codeInput code"/>
        </div>

        <div className="flex w-full justify-center items-center">
            <div className="inputLabel w-max flex items-center">Email</div>
            <input type="text" onChange={(e)=>setUserEmail(e.target.value)} className="codeInput code"/>
        </div>
        

        <div className="flex w-full justify-center items-center">
            <div className="inputLabel w-max flex items-center">Are you sure?</div>
        </div>
            <div className="small message">{message}</div>

        <div className="flex">
            <button onClick={()=>setFinalLoading(false)} className="button">No, Go Back</button>
            <button onClick={confirmHandler} className="button">Yes</button>
        </div>
        </div>
    </div>
    

    <div className="promptbackdrop loader-container hidden">    

    <div className="loader"></div>

    </div> 

    <div className={clsx('promptbackdrop', 
        {'hidden' : (documentFound)},
    )}>

        <div className="promptbox card ">

        <div className="flex w-full justify-center items-center">
            <div className="inputLabel w-max items-center error">{
                'Document Not Found'
                }
                <button onClick={()=>router.push('/')} className="button">Go Back</button>    
            </div>
        </div>

        </div>
    </div>

    </>


    return (Elements);
}