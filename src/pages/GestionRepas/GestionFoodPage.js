import React, {useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import {Link} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";

export default function GestionFoodPage(){
    const  [userIdentified, setUserIdentified] = useState("");

    useEffect(() => {
        document.title = "Gestion Food";
        NameIndentified();
    }, []);

    /**
     * recupère l'identité de la personne connecté.
     * @constructor
     */
    const NameIndentified = ()=>{
        try{
            const authAPI = AuthAPI.isAuthenticatedName();
            setUserIdentified (authAPI);

        }catch(error){
            console.log(error)
        }
    }

    return(

    <>

        <div className="d-flex">
            <Aside/>
            <section className="p-4 section_home bg_white bdr-bs">

                {!userIdentified ? ['Aucun utilisateur'] :
                    <div>
                        <strong>
                            <p>  {`${userIdentified.firstName}  ${userIdentified.lastName} vous êtes au foyer ${userIdentified.hearthName}`}</p>
                        </strong>
                    </div>}
                <div className="unities_top">
                    <div>
                        <h1> Je suis la GestionFoodPageScreen</h1>
                        <p>Ici vous pouvez crée une nouvelle</p>
                    </div>
                    <div className="unities_top_button">
                        <Link to="/      /new" className="btn btn-gold">Nouvelle Unité</Link>
                    </div>



                </div>



















            </section>







        </div>
    </>

)
}