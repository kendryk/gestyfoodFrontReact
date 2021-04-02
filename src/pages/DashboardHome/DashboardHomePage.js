import React, {useEffect, useState} from 'react';
import Aside from '../../components/layouts/Aside'
import './dashboardhome.scss';
import AuthAPI from "../../services/AuthAPI";

export default function DashboardHomePage(){

    /**
     * affichage sur onglet et appel function iddentification
     */
    useEffect(() => {
        document.title = "Home Dasboard";
        NameIndentified();
    }, []);

    const  [userIdentified, setUserIdentified] = useState("");


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
                <section className="p-5 section_home bg_white">
                    <h1>Bienvenue   </h1>

                    {!userIdentified ? ['Aucun utilisateur'] :

                        <p>
                            <strong className="text-capitalize">
                                {userIdentified.firstName} {userIdentified.lastName}
                            </strong>
                        </p>}

                    <p>Rappel de vos roles : </p>
                        {!userIdentified ? ['Aucun utilisateur'] : (userIdentified.roles).map(role=>

                    <p key={role}> - {role}</p>

                    )}
                    <p>D'ici vous pourrez naviguez sur l'ensemble des Services proposer par FoodGesty. </p>
                    <p>En cliquant sur Unités, vous avez accès à l'ensemble des unités.</p>
                </section>
            </div>

        </>
    )
}