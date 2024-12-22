"use client";;
import ResponseDisplayBoxCard from "@/app/ui/ResponseDisplayBoxCard";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from 'clsx'; 
import { getSurveyResponseFromFirestore, getSurveyFromFirestore, getQuestionResponseFromFirestore } from "@/app/firebase";


export default function Results() {
    const router = useRouter();
    const params = useSearchParams();
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [inFocus, setInFocus] = useState(0);
    const [sortBy, setSortBy] = useState('questions');
    const [users, setUsers] = useState([]);
    const [passwordCorrect, setPasswordCorrect] = useState(true);
    const [documentFound, setDocumentFound] = useState(true);
    const [activeUser, setActiveUser] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState(0);

    useEffect(() => {
        const surveyName = params.get('surveyName');

        if (params.get("surveyName") == ""){
            setDocumentFound(false);
            return;
        }

        getSurveyFromFirestore(surveyName).then((survey) => {
            if (survey == 'no such document') {
                setDocumentFound(false);
            }else if(survey == 'Incorrect passcode'){
                setPasswordCorrect(false);
            } 
            else {
                setQuestions(survey.questions);
                setUsers(survey.users);
                setActiveUser(0);
            }
        });

        questionSortOptionClickHandler(0);

    },[params]);


    var leftElements = [];
    var rightElements = [];

    if(sortBy == 'users'){
        if (inFocus > 0) {
            for (let i = 0; i < inFocus; i++) {
            leftElements.push(<ResponseDisplayBoxCard key={questions.length*10000 + i} className="left" questionID={i} onClick={leftClickHandler} body={responses[i]} heading={questions[i]} />);
            }
        }
        var centerElement = <ResponseDisplayBoxCard key={questions.length*10000 + inFocus} className="center" questionID={inFocus} body={responses[inFocus]} heading={questions[inFocus]} />;
        for (let i = inFocus+1; i < questions.length; i++) {
            rightElements.push(<ResponseDisplayBoxCard key={questions.length*10000 + i} className="right" questionID={i} onClick={rightClickHandler} body={responses[i]} heading={questions[i]} />);
        }
    }else{
        if (inFocus > 0) {
            for (let i = 0; i < inFocus; i++) {
            leftElements.push(<ResponseDisplayBoxCard key={users.length*10000 + i} className="left" questionID={i} onClick={leftClickHandler} body={responses[i]} heading={users[i]} />);
            }
        }
        var centerElement = <ResponseDisplayBoxCard key={users.length*10000 + inFocus} className="center" questionID={inFocus} body={responses[inFocus]} heading={users[inFocus]} />;
        for (let i = inFocus+1; i < users.length; i++) {
            rightElements.push(<ResponseDisplayBoxCard key={users.length*10000 + i} className="right" questionID={i} onClick={rightClickHandler} body={responses[i]} heading={users[i]} />);
        }
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

    function sortChange(sortBy){
        setSortBy(sortBy);
        setInFocus(0);

        if (sortBy == 'questions') {
            questionSortOptionClickHandler(0);
        }else{
            userSortOptionClickHandler(0);
        }
    }


    function userSortOptionClickHandler(index){
        const userEmail = users[index].split('~')[0];
        getSurveyResponseFromFirestore(params.get('surveyName'), userEmail ).then((data) => {
            setResponses(data.responses);
            setInFocus(0);
            setActiveUser(index);
        });
    }

    function questionSortOptionClickHandler(index){
        getQuestionResponseFromFirestore(params.get('surveyName'), index ).then((data) => {
            setResponses(data);
            setInFocus(0);
            setActiveQuestion(index);
        });
    }



    const Elements = <>
        <div className="heading-changeable">{params.get('surveyName')}</div>

        <div className="sort-options-container flex w-full justify-center">
            <div className="button" onClick={()=> sortChange('questions')}>Sort by Questions</div>
            <div className="button" onClick={()=> sortChange('users')}>Sort by Users</div>
        </div>

        <div className="options-scroll flex">
            {
                sortBy == 'questions' ? 
                    questions.map((question, index) => {
                        return <div key={index} className={clsx("option", activeQuestion==index && 'active')} onClick={()=>questionSortOptionClickHandler(index)}>Q{index+1} : {question}</div>
                    }) 
                :   users.map((user, index) => {
                        return <div key={index} className={clsx("option", activeUser==index && 'active')} onClick={()=>userSortOptionClickHandler(index)}>{user}</div>
                    })
            }
        </div>

    <div className='carousel results'>
        {leftElements}
        {centerElement}
        {rightElements}   
    </div>

    <div className={clsx('promptbackdrop', 
        {'hidden' : (passwordCorrect && documentFound)},
    )}>

        <div className="promptbox card ">

        <div className="flex w-full justify-center items-center">
            <div className="inputLabel w-max items-center error">{
                !passwordCorrect ? 'Incorrect Password' : 'Document Not Found'
                }
                <button onClick={()=>router.push('/')} className="button">Go Back</button>    
            </div>
        </div>

        </div>
    </div>

    </>

    return Elements;
}