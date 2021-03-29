import React, {useEffect} from 'react';

export default function AboutPageScreen(){


    useEffect(() => {
        document.title = "A Propos"
    }, []);



    return(
        <div className="container">
            <h1>Je suis la AboutPageScreen</h1>
        </div>
    )
}