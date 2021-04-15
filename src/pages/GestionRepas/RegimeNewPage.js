import React, {useContext, useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import {Link} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";
import Field from "../../components/forms/Field";
import axios from "axios";
import RegimeAPI from "../../services/RegimeAPI";
import {toast} from "react-toastify";
import AuthContext from "../../contexts/AuthContext";
export default function RegimeNewPage({history}){

    const {setIsAuthenticated} = useContext(AuthContext)


    const  handleLogout = ()=> {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté ")
        history.push("/login")
    }



    const id= window.location.pathname.split( "/" )[2];
    const  [userIdentified, setUserIdentified] = useState("");
    const [editing, setEditing] = useState(false);

    const [modif,setModif]= useState(false);


    const [regime, setRegime] = useState({
        name:"",
    });
    const [errors, setErrors] = useState({
        name:"",

    });
    /**
     * recupère l'identité de la personne connecté.
     * @constructor
     */
    const NameIndentified = ()=>{
        try{
            const authAPI = AuthAPI.isAuthenticatedName();
            setUserIdentified (authAPI);
            setRegime({...regime, 'hearth': "/api/hearths/"+userIdentified.hearthId});
        }catch(error){
            console.log(error)
        }
    }
    /**
     * Récupération de l'unité selon son identification
     * @param id
     * @returns {Promise<void>}
     */
    const fetchRegime = async (id)=>{
        try{
            const data=await axios.get("https://127.0.0.1:8000/api/diets/"+id)
                .then(response => response.data);
            const{name}= data
            setRegime({name});
        }catch(error){
            console.log(error.response)
            handleLogout()
        }
    };


    /**
     * Charger les regimes au chargement de la page.
     */
    useEffect(() => {
        document.title = "Gestion Food";
        NameIndentified();


    }, [modif]);

    useEffect(() => {
        if(id!=="new"){
            setEditing(true);
            fetchRegime(id);
        }
    }, [id]);


    /**
     * Gestion des champs
     * @param currentTarget
     */
    const handleChange = ({currentTarget})=>{
        setModif(true)
        const {name,value}= currentTarget;
        setRegime({...regime,[name]:value});

    };

    /**
     * Gestion de la soumission Put && Post
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit =async(event)=>{
        event.preventDefault();
        try{

            if(editing){

                const response = await axios.put("https://127.0.0.1:8000/api/diets/"+id, regime );
                toast.success("Vous avez modifié un régime !")
                history.replace('/regime');
            }else{
                const response = await axios.post("https://127.0.0.1:8000/api/diets", regime);
                toast.success("Vous avez créer un nouveau régime !")
                history.replace('/regime');
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
        let val = confirm(`Voulez-vous supprimer l'unité ${regime.name}`);
        if (val === true) {
            //on vérifie que l'utilisateur est sur de son choix!
            // eslint-disable-next-line no-restricted-globals
            let val2 = confirm("Attention , il y aura pas de retour possible");
            //on envoie une requete a la base de donnée pour supprimer l'element
            if (val2 === true) {
                try {
                    await RegimeAPI.delete(id)
                }catch (error){
                    console.log(error.response);

                }
            }
        }
    };
    console.log(regime)
    return(
        <>

            <div className="d-flex">
                <Aside/>
                <div className="p-4 section_home bg_white bdr-bs">

                    {!userIdentified ? ['Aucun utilisateur'] :
                        <div>
                            <strong>
                                <p>  {`${userIdentified.firstName}  ${userIdentified.lastName} vous êtes au foyer ${userIdentified.hearthName}`}</p>
                            </strong>
                        </div>}
                    <div className="unities_top">
                        <div>
                            {/* eslint-disable-next-line no-mixed-operators */}
                            {!editing&& <h1> Page de création des regimes </h1> || <h1> Page de modification des regimes </h1>}

                            {/* eslint-disable-next-line no-mixed-operators */}
                            {!editing&&<p>Ici vous pouvez crée de nouveaux regimes</p>||<p>Ici vous pouvez  modifier ou supprimer un regimes</p>}
                        </div>

                    </div>
                    <form
                        className="box-form"
                        onSubmit={handleSubmit}
                    >
                        <article className="box-imgField">

                            <div className="box-input">
                                <Field
                                    label="Nom du Regimes"
                                    name='name'
                                    value={regime.name}
                                    onChange={handleChange}
                                    error={errors.name}/>
                            </div>
                        </article>

                        <div className="form-group d-flex justify-content-center">
                            <button type="submit" className="btn btn-gold">Enregistrer</button>
                            <Link to='/regime' className="btn btn-link"> Retour au tableau de bord </Link>
                        </div>
                    </form>

                    {editing&&
                    <div className=" d-flex justify-content-center">
                        <button
                            onClick={()=> handleDelete(id)}
                            className='btn btn-danger'> Supprimer</button>
                    </div>    }



                </div>

            </div>
        </>
    )
}