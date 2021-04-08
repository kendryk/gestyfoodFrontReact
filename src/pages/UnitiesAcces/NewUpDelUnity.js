import React, {useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import {Link} from "react-router-dom";
import Field from "../../components/forms/Field";
import AuthAPI from "../../services/AuthAPI";
import "./newUpDelUnity.scss";
import axios from "axios";
import UnitiesAPi from "../../services/UnitiesAPI";
import {toast} from "react-toastify";


const NewUpDelUnity =({history})=>{

    const id= window.location.pathname.split( "/" )[2];
    const [editing, setEditing] = useState(false);
    const  [userIdentified, setUserIdentified] = useState("");
    const [modif,setModif]= useState(false);

    const [unit, setUnit] = useState({
        name:"",
        photo:"",
        hearth: "",
    });

    const [errors, setErrors] = useState({
        name:"",
        photo:"",
        hearth:'',
    });

    /**
     * recupère l'identité de la personne connecté.
     * @constructor
     */
    const NameIdentified = ()=>{
        try{
            setUserIdentified (AuthAPI.isAuthenticatedName());
            console.log(userIdentified)
            setUnit({...unit, 'hearth': "/api/hearths/"+userIdentified.hearthId});

        }catch(error){
            console.log(error)
        }
    }

    // todo optimiser pour importation photo

    /**
     * Récupération de l'unité selon son identification
     * @param id
     * @returns {Promise<void>}
     */
    const fetchUnit = async (id)=>{
        try{
            const data=await axios.get("https://127.0.0.1:8000/api/unities/"+id)
                .then(response => response.data);
            const{name,photo}= data
            setUnit({name,photo});
            }catch(error){
                console.log(error.response)
            }
    };

    /**
     * Charge l'identification de la personne au chargement de la page
     */
    useEffect(() => {
        NameIdentified();

    }, [modif] );

    useEffect(() => {
        if(id!=="new"){
            setEditing(true);
            fetchUnit(id);
        }
        }, [id]);


    /**
     * Gestion des champs
     * @param currentTarget
     */
    const handleChange = ({currentTarget})=>{
        setModif(true)
        const {name,value}= currentTarget;
        setUnit({...unit,[name]:value});

    };

    /**
     * Gestion de la soumission Put && Post
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit =async(event)=>{
        event.preventDefault();
        try{
            console.log(unit)
            if(editing){
                console.log(unit)
                const response = await axios.put("https://127.0.0.1:8000/api/unities/"+id, unit );
                toast.success("Vous venez de modifier une unité !")
            }else{
                const response = await axios.post("https://127.0.0.1:8000/api/unities", unit);
                toast.success("Vous venez de créer une unité !")
                history.replace('/dashboardUnities');
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
        let val = confirm(`Voulez-vous supprimer l'unité ${unit.name}`);
        if (val === true) {
            //on vérifie que l'utilisateur est sur de son choix!
            // eslint-disable-next-line no-restricted-globals
            let val2 = confirm("Attention , il y aura pas de retour possible");
            //on envoie une requete a la base de donnée pour supprimer l'element
            if (val2 === true) {
                try {
                    await UnitiesAPi.delete(id)
                    toast.success("L'unité a bien été supprimé!")
                }catch (error){
                    console.log(error.response);
                    toast.error("Des erreurs dans la suppression!")
                }
            }
        }
    };





    return(

        <>

            <div className="d-flex">
                <Aside/>
                <section className="p-4 section_home bg_white bdr-bs">

                    {!userIdentified ? ['Aucun utilisateur'] :
                        <div>
                            <strong >
                                <p>  {`${userIdentified.firstName}  ${userIdentified.lastName} vous êtes au foyer ${userIdentified.hearthName}`}</p>
                            </strong>
                        </div>}

                    <div className="unities_top">

                        <div>
                            {!editing&&<h1> Création d'une Unité</h1> || <h1> Modification d'une Unité</h1>}

                            {!editing&&<p>Ici vous pouvez crée une nouvelle</p>||<p>Ici vous pouvez  modifier ou supprimer une unité</p>}
                        </div>
                    </div>

                    <form
                        className="box-form"
                        onSubmit={handleSubmit}
                    >
                        <article className="box-imgField">

                            <div className="box-bimg">
                                <label>Ajouter une image :</label>
                                <input  className="box-img" type="file" onChange={handleChange}/>
                                <img src={unit.photo}/>
                            </div>

                            <div className="box-input">
                                <Field
                                    label="Nom du foyer"
                                    name='name'
                                    value={unit.name}
                                    onChange={handleChange}
                                    error={errors.name}/>
                            </div>
                        </article>


                        <div className="form-group d-flex justify-content-center">
                            <button type="submit" className="btn btn-gold">Enregistrer</button>
                            <Link to='/dashboardUnities/' className="btn btn-link"> Retour au tableau de bord </Link>
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

    );
}

export default NewUpDelUnity;