import React, {useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import {Link} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";
import axios from "axios";
import UnityAPi from "./../../services/UnityAPI";
import Field from "../../components/forms/Field";
import {toast} from "react-toastify";


export default function ResidentPage({history}){

    const unitId= window.location.pathname.split( "/" )[3];
    const unitName= window.location.pathname.split( "/" )[4];
    const id= window.location.pathname.split( "/" )[5];


    const [editing, setEditing] = useState(false);
    const  [userIdentified, setUserIdentified] = useState("");
    const [modif,setModif]= useState(false);

    const [resident, setResident] = useState({
        firstName:"",
        lastName:"",
        room:"",
        bornAt:"",
        unity: "",
    });

    const [errors, setErrors] = useState({
        firstName:"",
        lastName:"",
        room:"",
        bornAt:"",
        unity: "",
    });

    /**
     * recupère l'identité de la personne connecté.
     * @constructor
     */
    const NameIdentified = ()=>{
        try{
            setUserIdentified (AuthAPI.isAuthenticatedName());
            setResident({...resident,
                ['unity']:"/api/unities/"+unitId,
                ['hearth']: "/api/hearths/"+userIdentified.hearthId
            });



        }catch(error){
            console.log(error)
        }
    }

    /**
     * récupere le resident selon son Id
     * @param id
     * @returns {Promise<void>}
     */
    const fetchResident = async (id)=>{
        try{
            const data=await axios.get("https://127.0.0.1:8000/api/residents/"+id)
                .then(response => response.data);
            console.log(data)
            const{firstName,lastName,room,bornAt}= data
            setResident({firstName,lastName,room,bornAt});
        }catch(error){
            console.log(error.response)
        }
    };

    /**
     * Appell de l'identification
     */
    useEffect(() => {
        NameIdentified();
    }, [modif] );

    /**
     * Si page avec un id appel de la fonction
     */
    useEffect(() => {
        if(id!=="new"){
            setEditing(true);
            fetchResident(id);
        }
    }, [id]);


    /**
     * Gestion des champs
     * @param currentTarget
     */
    const handleChange = ({currentTarget})=>{
        setModif(true)
        const {name,value}= currentTarget;
        setResident({...resident,[name]:value});

    };


    /**
     * Gestion des soumissions
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit =async(event)=>{
        event.preventDefault();
        try{
            console.log(resident)
            if(editing){
                console.log(resident)
                const response = await axios.put("https://127.0.0.1:8000/api/residents/"+id, resident );
                toast.success("Vous venez de modifier un résident !")
            }else{
                const response = await axios.post("https://127.0.0.1:8000/api/residents", resident);
                toast.success("Vous venez de créer un nouveaux résident !")
                history.replace("/dashboardUnities/unity/"+unitId+"/"+unitName);
            };
            setErrors({});
        }catch(error){
            const {violations} = error.response.data
            if(violations) {
                const apiErrors = {};
                violations.forEach(violation=>{
                    apiErrors[violation.propertyPath]= violation.message;
                });
                setErrors(apiErrors);
                toast.error("Des erreurs dans le formulaires!")
            }

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
        let val = confirm(`Voulez-vous supprimer l'unité ${resident.name}`);
        if (val === true) {
            //on vérifie que l'utilisateur est sur de son choix!
            // eslint-disable-next-line no-restricted-globals
            let val2 = confirm("Attention , il y aura pas de retour possible");
            //on envoie une requete a la base de donnée pour supprimer l'element
            if (val2 === true) {
                try {
                    await UnityAPi.delete(id)
                    toast.success("le Résident a bien été supprimé!")
                }catch (error){
                    console.log(error.response);
                    toast.error("Des erreurs dans la suppression!")
                }
            }
        }
    };

    console.log(resident)

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
                    <div >
                        <div>
                            {!editing&&<h1> Création d'un résident'</h1> || <h1> Modification d'une Résident</h1>}

                            {!editing&&<p>Ici vous pouvez crée un nouveau</p>||<p>Ici vous pouvez  modifier ou supprimer un Résident</p>}
                        </div>

                    </div>

                    <form
                        className=""
                        onSubmit={handleSubmit}
                    >
                        <article className="form-group">
                            <div className=" my-3">
                                <Field
                                    label="N° de chambre"
                                    name='room'
                                    value={resident.room}
                                    onChange={handleChange}
                                    error={errors.room}/>
                            </div>

                            <div className=" my-3">
                                <Field
                                    label="Nom"
                                    name='firstName'
                                    value={resident.firstName}
                                    onChange={handleChange}
                                    error={errors.firstName}/>
                            </div>

                            <div className=" my-3">
                                <Field
                                    label="Prénom"
                                    name='lastName'
                                    value={resident.lastName}
                                    onChange={handleChange}
                                    error={errors.lastName}/>
                            </div>

                            <div className=" my-3">
                                <Field
                                    label="Date de naissance"
                                    name='bornAt'
                                    value={resident.bornAt}
                                    onChange={handleChange}
                                    error={errors.bornAt}/>
                            </div>


                        </article>


                        <div className="form-group d-flex justify-content-center">
                            <button type="submit" className="btn btn-gold">Enregistrer</button>
                            <Link to={"/dashboardUnities/unity/"+unitId+"/"+unitName} className="btn btn-link"> Retour au tableau de bord </Link>
                        </div>
                    </form>

                    {editing&&
                    <div className=" d-flex justify-content-center">
                        <button
                            onClick={()=> handleDelete(id)}
                            className='btn btn-danger'> Supprimer</button>
                    </div>    }

                </section>







            </div>
        </>
    )
}