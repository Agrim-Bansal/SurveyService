export default function InputBoxCard({children, className, setQuestions, questions ,questionID}) {


    function inputHandler(e) {
        var newQuestions = [...questions];
        newQuestions[questionID] = e.target.value;
        setQuestions(newQuestions);
    }

    return <div className= {`card ${className}`}> <textarea className="questionBox" defaultValue={children} onChange={inputHandler}></textarea></div>
}