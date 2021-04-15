import React, {useContext, useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import {Link} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";
import Field from "../../components/forms/Field";
import axios from "axios";
import TextureAPI from "../../services/TextureAPI"
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
    const [texture, setTexture] = useState({
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
            setTexture({...texture, 'hearth': "/api/hearths/"+userIdentified.hearthId});
        }catch(error){
            console.log(error)
        }
    }
    /**
     * Récupération de l'unité selon son identification
     * @param id
     * @returns {Promise<void>}
     */
    const fetchTexture = async (id)=>{
        try{
            const data=await axios.get("https://127.0.0.1:8000/api/textures/"+id)
                .then(response => response.data);
            const{name}= data
            setTexture({name});
        }catch(error){
            console.log(error.response)
            handleLogout()
        }
    };


    /**
     *  titre de l'onglet et Charge l'indtiter de la personne connecté
     */
    useEffect(() => {
        document.title = "Gestion Food";
        NameIndentified();


    }, [modif]);


    /**
     * Charger les textures au chargement de la page si id= int
     */
    useEffect(() => {
        if(id!=="new"){
            setEditing(true);
            fetchTexture(id);
        }
    }, [id]);


    /**
     * Gestion des champs
     * @param currentTarget
     */
    const handleChange = ({currentTarget})=>{
        setModif(true)
        const {name,value}= currentTarget;
        setTexture({...texture,[name]:value});

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
                const response = await axios.put("https://127.0.0.1:8000/api/textures/"+id, texture );
                toast.success("Vous avez modifié une texture !")
                history.replace('/regime');
            }else{
                const response = await axios.post("https://127.0.0.1:8000/api/textures", texture);
                toast.success("Vous avez crée une nouvelle texture !")
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
        let val = confirm(`Voulez-vous supprimer l'unité ${texture.name}`);
        if (val === true) {
            //on vérifie que l'utilisateur est sur de son choix!
            // eslint-disable-next-line no-restricted-globals
            let val2 = confirm("Attention , il y aura pas de retour possible");
            //on envoie une requete a la base de donnée pour supprimer l'element
            if (val2 === true) {
                try {
                    await TextureAPI.delete(id)
                }catch (error){
                    console.log(error.response);
                }
            }
        }
    };
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
                            {!editing&& <h1> Page de création des textures </h1> || <h1> Page de modification des textures </h1>}

                            {!editing&&<p>Ici vous pouvez crée de nouveaux textures</p>||<p>Ici vous pouvez  modifier ou supprimer un textures</p>}
                        </div>

                    </div>
                    <form
                        className="box-form"
                        onSubmit={handleSubmit}
                    >
                        <article className="box-imgField">

                            <div className="box-input">
                                <Field
                                    label="Nom de la texture"
                                    name='name'
                                    value={texture.name}
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