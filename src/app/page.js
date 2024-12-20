"use client";
import Link from "next/link";
import {useState} from "react";
import './style.css'
import Section from "@/app/ui/Section";


export default function Home() {

  const fillSurveyName = useState('');
  const viewSurveyName= useState('');
  const viewSurveyPassword = useState('');
  const editSurveyName = useState('');
  const editSurveyPassword = useState('');

  return (
    <>
      <h1 className="heading">SurveyService</h1>


      <div className="container flex flex-col align-center">

        <div className="flex flex-row justify-center align-center w-full row"> 
          <Section type="Create A Survey" href="/create" reqSurveyName={false} reqPassword={false}></Section>
          <Section type = "Fill This Survey" href={"/fill"} reqSurveyName={true} reqPassword={false} state={[fillSurveyName]}></Section>
        </div>

        <div className="flex flex-row justify-center align-center w-full row"> 
          <Section type="View Survey Responses" href="/results" reqSurveyName={true} reqPassword={true} state={[viewSurveyName, viewSurveyPassword]}></Section>
          <Section type="Edit Survey" href="/edit" reqSurveyName={true} reqPassword={true} state={[editSurveyName, editSurveyPassword]}></Section>
        </div>

      </div>
      </>

  );
}