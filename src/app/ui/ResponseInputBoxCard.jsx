export default function ResponseInputBoxCard({children, className, setResponses, responses ,questionID, autoFocus, onClick, totalQuestions}) {


    function inputHandler(e) {
        var newResponses = [...responses];
        newResponses[questionID] = e.target.value;
        setResponses(newResponses);
    }

    return (
    <div className= {`card ${className} response`} onClick={onClick} id={`q${questionID}`}>
        <div className="questionLabel">{children}</div>
        <textarea className={`responseBox`} defaultValue={responses[questionID]} onChange={inputHandler} autoFocus={autoFocus}></textarea>
    </div>
    )
}