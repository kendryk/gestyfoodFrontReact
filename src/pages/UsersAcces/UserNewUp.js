import React, {useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import {Link} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";
import axios from "axios";
import UsersAPi from "./../../services/UsersAPi";
import Field from "../../components/forms/Field";


export default function UserNewUp({history}){


    const id= window.location.pathname.split( "/" )[2];

    const [editing, setEditing] = useState(false);
    const  [userIdentified, setUserIdentified] = useState("");
    const [modif,setModif]= useState(false);

    const[stateCheck,setStateCheck]= useState({
        options: [
            {id:'ROLE_DIRECTOR',name: "Role de direction"},
            {id:'ROLE_MODERATOR',name: "Role de modération"},
            {id:'ROLE_EDITOR',name: "Role d'édition"},
            {id:'ROLE_USER',name: "Role d'utilisateur"},
            ],
        optionSelected: 'ROLE_USER'

    })

    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        work:"",
        hearth:"",
    });
    /**
     * Initialise le role de l'utilisateur
     */
    const [roleUser, setRoleUser] = useState ({
        roles:["ROLE_USER"],
    });
    const roles=roleUser.roles;


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
            setUser({
                ...user,
                ['hearth']:"/api/hearths/"+userIdentified.hearthId,

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
            const{firstName,lastName,work,phone,hearth}= data
            setUser({firstName,lastName,work,phone,hearth});
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
            fetchUser(id);
        }
    }, [id]);


    /**
     * Gestion des champs
     * @param currentTarget
     */
    const handleChange = ({currentTarget})=>{
        setModif(true)
        const {name,value}= currentTarget;
        setUser({...user,[name]:value,roles});
    };


    const handleCheckChange = (e)=>{
        if (stateCheck.optionSelected === e.target.id) {
            setStateCheck({...stateCheck,["optionSelected"]:undefined});

        } else {
            setStateCheck({...stateCheck,["optionSelected"]:e.target.id});
            setRoleUser({...roleUser,["roles"]:[e.target.id]});
            setUser({...user,roles});
        }
    };
    console.log(user);
    console.log(roles);



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

    const Item = ({ option, checked, handleCheckChange }) => {
        return (
            <div className="card my-3">
                <div className="card-content">
                    <p><label htmlFor={option.id}>
                        <input
                            className="filled-in"
                            type="checkbox"
                            id={option.id}
                            onChange={handleCheckChange}
                            checked={checked} />
                        <span>{option.id}. {option.name}</span>
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
                //TODO flash  notification modification
            }else{
                const response = await axios.post("https://127.0.0.1:8000/api/users", user);
                //TODO flash  notification succes
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
                //TODO flash  notification modification
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
                }catch (error){
                    console.log(error.response);
                }
            }
        }
    };

    console.log(user)

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
                            {/*<label>*/}
                            {/*    Vous avez selectionner {roleUser.roles} Vous confirmer ?*/}
                            {/*    <input*/}
                            {/*        name="isGoing"*/}
                            {/*        type="checkbox"*/}
                            {/*        checked={this.state.isGoing}*/}
                            {/*        onChange={this.handleInputChange} />*/}
                            {/*</label>*/}





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