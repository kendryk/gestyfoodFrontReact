import React, {useEffect, useState} from 'react';
import Aside from '../../layouts/Aside'
import './dashboardhome.scss';
import AuthAPI from "../../../services/AuthAPI";
export default function DashboardHomePageScreen(){


    useEffect(() => {
        document.title = "Home Dasboard";
        NameIndentified();
    }, []);

    const  [userIdentified, setUserIdentified] = useState();

//recuper le l'identié de la personne connecté.
    const NameIndentified = async()=>{

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
                    <h1>Bienvenu   </h1>
                    <p>Bienvenu  dans votre espace personnelle.</p>
                    <p>Vous etes : </p>
                        {!userIdentified ? ['Aucun utilisateur'] : (userIdentified.roles).map(role=>

                    <p> - {role}</p>

                    )}
                    <p>D'ici vous pourrez naviguez sur l'ensemble des Services proposer par FoodGesty. </p>
                    <p>En cliquant sur Unités, vous avez accès à l'ensemble des unités.</p>

                </section>
            </div>


        </>


    )
}