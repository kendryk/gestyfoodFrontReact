import React, {useEffect} from 'react';

export default function CreateNewRegisterPageScreen(history){
    console.log(history)
    useEffect(() => {
        document.title = "Nouveaux register"
    }, []);

    return(
        <div className="container">
            <h1>CreateNewRegisterPageScreen</h1>
        </div>
    )
}