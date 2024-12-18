

export default function Heading({ children, setSurveyName, setMessage }) {

  function inputHandler(e){
    setSurveyName(e.target.value);
    setMessage('');
  }

  return <input className='heading-changeable' defaultValue={children} onChange={inputHandler}></input>

}