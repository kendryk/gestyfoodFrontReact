import React, {useEffect} from 'react';

export default function GestionFoodPageScreen(){

    useEffect(() => {
        document.title = "Gestion Food"
    }, []);

    return(
        <div className="container">
            <h1>Je suis la GestionFoodPageScreen</h1>
        </div>
    )
}