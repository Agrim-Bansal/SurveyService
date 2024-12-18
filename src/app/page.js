"use client";
import Image from "next/image";
import InputBoxCard from "@/app/ui/InputBoxCard";
import Link from "next/link";
import {useState} from "react";

export default function Home() {

  const [fillSurveyCode, setFillSurveyCode] = useState('');
  const [viewSurveyCode, setViewSurveyCode] = useState('');
  const [viewSurveyPassword, setViewSurveyPassword] = useState('');

  return (
    <>
    <h1 className="heading">SurveyService</h1>
    <div className="container">
    <form className="fillSurveyContainer">
      <div className="">
        <input type="code" className="input" placeholder="SurveyCode" required />
      </div>
        
      <button className="button">
        <Link href={`/fill?code=${fillSurveyCode}`}> Fill This Survey </Link>
      </button> 

    </form> 

    <hr />

    <form className="viewSurveyResultContainer">
      <div className="">
        <input className="input" placeholder="SurveyCode" required onChange={()=> setViewSurveyCode(this.value)}/>
      </div>
      <div className="">
        <input className="input" placeholder="Password" required onChange={()=> setViewSurveyPassword(this.value)}/>
      </div>
        
      <button className="button">
        <Link href={`/view?code=${viewSurveyCode}`}> Fill This Survey </Link>
      </button> 
    </form>

    
    <hr className="divider"/>

    
    <div className="createSurveyContainer">

      <button className="button">
        <Link href="/create"> Create A Survey </Link>
      </button>
    
    </div>
    
    </div>
    </>
  );
}