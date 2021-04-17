import React, {useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import AuthAPI from "../../services/AuthAPI";

import {toast} from "react-toastify";
import axios from "axios";


export default function PreferencePage({history}){


    const  [userIdentified, setUserIdentified] = useState("");

    /**
     * affichage sur onglet et appel function iddentification
     */
    useEffect(() => {
        document.title = "Préférence";
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





    /**
     * Gestion de la suppresion d'une unités
     * @param id
     * @returns {Promise<void>}
     */
    const handleDelete = async (id) => {
        console.log(id)
        // eslint-disable-next-line no-restricted-globals
        let val = confirm(`Voulez-vous supprimer l'unité ${userIdentified.hearthName}`);
        if (val === true) {
            //on vérifie que l'utilisateur est sur de son choix!
            // eslint-disable-next-line no-restricted-globals
            let val2 = confirm("Attention , il y aura pas de retour possible");
            //on envoie une requete a la base de donnée pour supprimer l'element
            if (val2 === true) {
                try {

                    await axios.delete("https://localhost:8000/api/hearths/"+id)
                    toast.success("L'unité a bien été supprimé!")

                    history.replace("/login");

                }catch (error){
                    console.log(error.response);
                    toast.error("Des erreurs dans la suppression!")
                }
            }
        }
    };

    console.log(userIdentified)



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
                        <h1>Vous êtes sur la page de préférence </h1>
                        <p>Ici vous pouvez suppprimer votre compte. Attention aucun retour ne sera possible.</p>
                    </div>

                </div>


                <div className='border border-danger p-5 m-5'>
                <div className=" d-flex justify-content-center">
                    <button
                        onClick={()=> handleDelete(`${userIdentified.hearthId}`)}
                        className='btn btn-danger'> Supprimer</button>
                </div>
                </div>

            </section>







        </div>
    </>
    )
}