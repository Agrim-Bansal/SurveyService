export default function ResponseDisplayBoxCard({children, className, body ,questionID, onClick, heading}) {

    return (
    <div className= {`card ${className} response`} onClick={onClick} id={`q${questionID}`}>
        <div className="questionLabel">{heading}</div>
        <div className={`responseBox display`}>{body}</div>
    </div>
    )
}