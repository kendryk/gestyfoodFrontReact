import React, {useContext, useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import {Link} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";
import axios from "axios";
import UsersAPi from "./../../services/UsersAPi";
import Field from "../../components/forms/Field";
import {toast} from "react-toastify";
import AuthContext from "../../contexts/AuthContext";


export default function UserNewUp({history}){

    const {setIsAuthenticated} = useContext(AuthContext)

    const  handleLogout = ()=> {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté ")
        history.push("/login")
    }

    const id= window.location.pathname.split( "/" )[2];

    const [editing, setEditing] = useState(false);
    const  [userIdentified, setUserIdentified] = useState("");
    const [modif,setModif]= useState(false);

    const[stateCheck,setStateCheck]= useState({
        options: [
            {id:'ROLE_DIRECTOR',name:   "Ceci autorise la lecture,  la création, la modification, " +
                                        "suppression d'une fiche résident et d'une unité, ainsi que  la modification des régimes / nature du résident." +
                                        "De plus, il a accès à la  suppression du compte (attention ceci supprimera toutes les données)"},
            {id:'ROLE_MODERATOR',name: "Ceci autorise la lecture,  la création, la modification, suppression d'une fiche résident " +
                                        "et d'une unité, ainsi que  la modification des régimes / nature du résident"},
            {id:'ROLE_EDITOR',name:     "Ceci autorise la lecture, la modification des régimes / nature du résident sur la page gestion  repas"},
            {id:'ROLE_USER',name:       "Ceci autorise la lecture sur le site"},
            ],
        optionSelected: 'ROLE_USER'
    })

    const roles=[stateCheck.optionSelected];
    console.log(roles)
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        work:"",
        hearth:"",
    });

    const [errors, setErrors] = useState({
        firstName:"",
        lastName:"",
        work:"",
        hearth:"",
    });

    /**
     * recupère l'identité de la personne connecté.
     * @constructor
     */
    const NameIdentified = ()=>{
        try{
            setUserIdentified (AuthAPI.isAuthenticatedName());
            const userHearthId = userIdentified.hearthId;
            setUser({
                ...user,
                ['hearth']:"/api/hearths/"+userHearthId,
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
    const fetchUser = async (id)=>{
        try{
            const data=await axios.get("https://127.0.0.1:8000/api/users/"+id)
                .then(response => response.data);
            const{firstName,lastName,work,phone,roles}= data
            setUser({firstName,lastName,work,phone,roles});
        }catch(error){
            console.log(error.response)
            handleLogout()
        }
    };

    /**
     * Si page avec un id appel de la fonction
     */
    useEffect(() => {
        NameIdentified();

    }, [modif]);

    /**
     * Si page avec un id appel de la fonction
     */
    useEffect(() => {
        if(id!=="new"){
            setEditing(true);
            fetchUser(id);
        }

    }, [id]);

    /**
     * Gestion des champs
     * @param currentTarget
     */
    const handleChange = ({currentTarget})=>{
        modif === true? setModif(false) : setModif(true);
        const {name,value}= currentTarget;
        setUser({...user,[name]:value,roles});
    };

    /**
     * Gestion des champs des checks
     * @param e
     */
    const handleCheckChange = (e)=>{
        modif === true? setModif(false) : setModif(true);
        if (stateCheck.optionSelected === e.target.id) {
            setStateCheck({...stateCheck,["optionSelected"]:undefined});

        } else {
            setStateCheck({...stateCheck,["optionSelected"]:e.target.id});

        }
        setUser({...user,["roles"]:[e.target.id]});
    };

    console.log(user)

    /**
     * Gestion des de la liste checks
     * @param options
     * @param optionSelected
     * @param handleCheckChange
     * @returns {JSX.Element}
     * @constructor
     */
    const ItemList = ({ options, optionSelected, handleCheckChange }) => {
        return (
            <div className="col s12">
                {
                    options.map((option, index) => (
                        <Item
                            key={index}
                            option={option}
                            checked={optionSelected === option.id}
                            handleCheckChange={handleCheckChange} />
                    ))
                }
            </div>
        )
    }

    /**
     * Gestion de item checks
     * @param option
     * @param checked
     * @param handleCheckChange
     * @returns {JSX.Element}
     * @constructor
     */
    const Item = ({ option, checked, handleCheckChange }) => {
        return (
            <div className="card my-3">
                <div className="card-content">
                    <p><label htmlFor={option.id}>
                        <input
                            className="bdr-bs "
                            type="checkbox"
                            id={option.id}
                            onChange={handleCheckChange}
                            checked={checked} />
                        <span><strong> {option.id}</strong> : {option.name}</span>
                    </label></p>
                </div>
            </div>
        )
    }

    /**
     * Gestion des soumissions
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit =async(event)=>{
        event.preventDefault();
        try{
            if(editing){
                const response = await axios.put("https://127.0.0.1:8000/api/users/"+id, user );
                toast.success("Vous avez modifier un utilisateur")
                history.replace("/user");
            }else{
                const response = await axios.post("https://127.0.0.1:8000/api/users", user);
                toast.success("Vous avez crée un nouveaux un utilisateur")
                history.replace("/user");
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
        // eslint-disable-next-line no-restricted-globals
        let val = confirm(`Voulez-vous supprimer l'unité ${user.name}`);
        if (val === true) {
            //on vérifie que l'utilisateur est sur de son choix!
            // eslint-disable-next-line no-restricted-globals
            let val2 = confirm("Attention , il y aura pas de retour possible");
            //on envoie une requete a la base de donnée pour supprimer l'element
            if (val2 === true) {
                try {
                    await UsersAPi.delete(id)
                    toast.success("Vous avez supprimé un utilisateur")
                    history.replace("/user");
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
                            <strong>
                                <p>  {`${userIdentified.firstName}  ${userIdentified.lastName} vous êtes au foyer ${userIdentified.hearthName}`}</p>
                            </strong>
                        </div>}
                    <div >
                        <div>
                            {!editing&&<h1> Création d'un collaborateur</h1> || <h1> Modification de collaborateur</h1>}
                            {!editing&&<p>Ici vous pouvez crée un nouveau collaborateur</p>||<p>Ici vous pouvez  modifier le collaborateur ou le supprimer</p>}
                        </div>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="login_box_form"
                    >
                        <div className="container">
                            <div className="row p-2">
                                <ItemList
                                    options={stateCheck.options}
                                    optionSelected={stateCheck.optionSelected}
                                    handleCheckChange={(e) => handleCheckChange(e)} />
                            </div>


                        </div>

                        <Field
                            label="Poste"
                            name='work'
                            value={user.work}
                            onChange={handleChange}
                            error={errors.work}/>


                        <Field
                            label="Prénom"
                            name='firstName'
                            value={user.firstName}
                            onChange={handleChange}
                            error={errors.firstName}/>


                        <Field
                            label="Nom"
                            name='lastName'
                            value={user.lastName}
                            onChange={handleChange}
                            error={errors.lastName}/>

                        <Field
                            label="Télephone"
                            name='phone'
                            type="tel"
                            value={user.phone}
                            onChange={handleChange}
                            error={errors.phone}/>

                        {!editing&&
                        <Field
                            label="email"
                            name='email'
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                            error={errors.email}/>}

                        {!editing&&
                        <Field
                            label="Mot de passe"
                            name='password'
                            type="password"
                            placeholder="Mot de passe"
                            value={user.password}
                            onChange={handleChange}
                            error={errors.password}/>}

                        <div className="form-group d-flex justify-content-center">
                            <button type="submit" className="btn btn-gold">Enregistrer</button>
                            <Link to={"/user"} className="btn btn-link"> Retour au tableau de bord </Link>
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