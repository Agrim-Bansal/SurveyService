export default function InputBoxCard({children, className, setQuestions, questions ,questionID, autoFocus, onClick, totalQuestions}) {


    function inputHandler(e) {
        var newQuestions = [...questions];
        newQuestions[questionID] = e.target.value;
        setQuestions(newQuestions);
    }

    return <div className= {`card ${className}`} onClick={onClick} id={`q${questionID}`}> <textarea className={`questionBox`} defaultValue={children} onChange={inputHandler} autoFocus={autoFocus}></textarea></div>
}