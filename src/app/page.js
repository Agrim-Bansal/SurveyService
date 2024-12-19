"use client";
import Link from "next/link";
import {useState} from "react";
import './style.css'
import Section from "@/app/ui/Section";


export default function Home() {

  const [fillSurveyCode, setFillSurveyCode] = useState('');
  const [viewSurveyCode, setViewSurveyCode] = useState('');
  const [viewSurveyPassword, setViewSurveyPassword] = useState('');

  return (
    <>
      <h1 className="heading">SurveyService</h1>


      <div className="container flex flex-col align-center">

        <div className="flex flex-row justify-center align-center w-full row"> 
          <Section type="Create A Survey" href="/create" surveyName={false} password={false}></Section>
          <Section type = "Fill This Survey" href={"/fill"} surveyName={true} password={false}></Section>
        </div>

        <div className="flex flex-row justify-center align-center w-full row"> 
          <Section type="View Survey Responses" href="/results" surveyName={true} password={true}></Section>
          <Section type="Edit Survey" href="/results" surveyName={true} password={true}></Section>
        </div>

      </div>
      </>

  );
}