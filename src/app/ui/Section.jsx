import Link from 'next/link';

export default function({type, href, surveyName, password}) {
    return (
        <div className="homecard flex-col justify-center" >
            
            {surveyName && <div className="flex justify-center field"> 
                <label className='label'>Survey Name</label>
                <input type="text" className="input" required />
            </div>}

            {password && <div className="flex align-center justify-center field">
                <label>Password</label>
                <input type="password" className="input" required />
            </div> }

            <div>
                <Link className="button" href={href}> {type} </Link>
            </div>

        </div>
    )
}