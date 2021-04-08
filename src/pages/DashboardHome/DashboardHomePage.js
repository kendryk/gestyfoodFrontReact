import React, {useEffect, useState} from 'react';
import Aside from '../../components/layouts/Aside'
import './dashboardhome.scss';
import AuthAPI from "../../services/AuthAPI";

export default function DashboardHomePage(){


    const  [userIdentified, setUserIdentified] = useState("");

    /**
     * affichage sur onglet et appel function iddentification
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
                            <strong className="text-capitalize">
                                <p>  {`${userIdentified.firstName}  ${userIdentified.lastName} vous êtes au foyer ${userIdentified.hearthName}`}</p>
                            </strong>
                        </div>}
                    <h1>Bienvenue   </h1>

                    <p>D'ici vous pourrez naviguez sur l'ensemble des Services proposer par FoodGesty. </p>
                    <p>En cliquant sur Unités, vous avez accès à l'ensemble des unités.</p>
                    <p>En cliquant sur Autorisation, vous avez accès à la gestion de vos collaborateurs ou salarié.</p>
                    <p>En cliquant sur Repas, vous avez accès à la gestion des repas.</p>
                    <p>En cliquant sur Regime/Texture, vous avez accès à la gestion des regimes textures.</p>
                    <p>En cliquant sur Préférence, vous avez accès au préférence.</p>


                    {/*todo 1er visite*/}

                    <div>
                        <h2>Premiere recommendation</h2>

                        <p>Pour votre premiere visite nous vous conseillons de commencer à
                            allez  sur la gestion de vos collaborateurs en cliquant sur Autorisation.
                        Par ce principe, vous pourriez invitez vos collaboratuer et personnels à untiliser cette application.</p>
                    </div>



                </section>
            </div>

        </>
    )
}