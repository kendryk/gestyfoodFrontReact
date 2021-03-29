import React, {useEffect} from 'react';
import "./workInProgress.scss"
export default function AboutPageScreen(){


    useEffect(() => {
        document.title = "A Propos"
    }, []);



    return(
        <div className="container box">
            <h1> AboutPageScreen</h1>

           <div className="box_in_construct" >

           </div>



        </div>
    )
}