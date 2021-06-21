import React, {useEffect, useState} from 'react';
import Aside from '../../components/layouts/Aside'
import './dashboardhome.scss';
import AuthAPI from "../../services/AuthAPI";

export default function DashboardHomePage(){

    const  [userIdentified, setUserIdentified] = useState("");

    /**
     * affichage sur onglet et appel function identification
     */
    useEffect(() => {
        document.title = "Home Dasboard";
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
                    <h1>Bienvenue </h1>

                    <p>D'ici vous avez la possibilité de naviguer sur l'ensemble des Services proposé par FoodGesty. </p>
                    <p>En cliquant sur Unités, vous avez accès à l'ensemble des unités.</p>
                    <p>En cliquant sur Autorisation, vous avez accès à la gestion de vos collaborateurs ou salarié.</p>
                    <p>En cliquant sur Repas, vous avez accès à la gestion des repas.</p>
                    <p>En cliquant sur Régime/Texture, vous avez accès à la gestion des régimes textures.</p>
                    <p>En cliquant sur Préférence, vous avez accès aux préférences.</p>

                    {/*todo 1er visite*/}
                    <div>
                        <h2>Première recommandation</h2>

                        <p>Pour votre première visite nous vous conseillons de commencer à
                            aller  sur la gestion de vos collaborateurs en cliquant sur Autorisation.</p>
                        <p> Par ce principe, vous vous avez la possibilité d'inviter vos collaborateurs et personnels à utiliser cette application.</p>
                    </div>

                </section>
            </div>

        </>
    )
}