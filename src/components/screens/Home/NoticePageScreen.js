import React, {useEffect} from 'react';

export default function NoticePageScreen(){


    useEffect(() => {
        document.title = "Notice"
    }, []);



    return(
        <div className="container box">
            <h1> NoticePageScreen</h1>

            <div className="box_in_construct" >

            </div>



        </div>
    )
}