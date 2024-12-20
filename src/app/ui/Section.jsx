import Link from 'next/link';

export default function({type, href, reqSurveyName, reqPassword, state}) {
    var addr, setSurveyName, setPassword, surveyName, password;

    if(reqSurveyName && reqPassword) {
        [[surveyName, setSurveyName], [password, setPassword]] = state;
        addr = href + '?surveyName=' + surveyName + '&password=' + password;
    }else if(reqSurveyName) {
        [[surveyName, setSurveyName], [password, setPassword]] = [...state, ['', ()=>{}]];
        addr = href + '?surveyName=' + surveyName;
    }else{
        [[surveyName, setSurveyName], [password, setPassword]] = [['', ()=>{}], ['', ()=>{}]];
        addr = href;
    }


    return (
        <div className="homecard flex-col justify-center" >
            
            {reqSurveyName && <div className="flex justify-center field"> 
                <label className='label'>Survey Name</label>
                <input type="text" className="input" required onChange={(e)=>setSurveyName(e.target.value)}/>
            </div>}

            {reqPassword && <div className="flex align-center justify-center field">
                <label>Password</label>
                <input type="password" className="input" required onChange={(e)=>setPassword(e.target.value)}/>
            </div> }

            <div>
                <Link className="button" href={addr}> {type} </Link>
            </div>

        </div>
    )
}