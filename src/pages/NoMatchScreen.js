import React, {useEffect} from 'react';

export default function NoMatchScreen(){

    useEffect(() => {
        document.title = "404"
    }, []);

    return(
        <div className="container">
            <h1>Cette page n'existe pas </h1>

        </div>
    )
}