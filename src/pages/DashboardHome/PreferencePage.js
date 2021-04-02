import React, {useEffect} from 'react';

export default function PreferencePage(){

    useEffect(() => {
        document.title = "Préférence"
    }, []);

    return(
        <div className="container">
            <h1>Je suis la PreferencePageScreen</h1>
        </div>
    )
}