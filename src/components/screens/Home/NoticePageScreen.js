import React, {useEffect} from 'react';

export default function NoticePageScreen(){


    useEffect(() => {
        document.title = "Notice"
    }, []);



    return(
        <div className="container">
            <h1>Je suis la NoticePageScreen</h1>

        </div>
    )
}