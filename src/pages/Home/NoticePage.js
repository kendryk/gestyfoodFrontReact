import React, {useEffect} from 'react';

export default function NoticePage(){

    /**
     * Affiche le nom de la page à l'ouverture de celle-ci
     */
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