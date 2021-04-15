import React, {useEffect, useState} from 'react';
import Field from "../../components/forms/Field";
import { Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

export default function CreateNewRegisterPage({history,location}){

    /**
     * Redupere id dans la location
     */
    const id= location.pathname.split( "/" )[2];
    
    /**
     * Initialise le role de l'utilisateur
     */
    const [roleUser] = useState ({
        roles:["ROLE_DIRECTOR"],
    });
    const roles=roleUser.roles;

    /**
     * Initialise et modifie les nouvelles inscriptions
     */
    const [register,setRegister] = useState ({
        work: "",
        firstName: "",
        lastName:"",
        phone:"",
        email:"",
        password:"",
        passwordConfirm:"",
        hearth:"",
    });

    /**
     * Initialise et modifie les erreurs
     */
    const [errors, setErrors] = useState({
        work: "",
        firstName: "",
        lastName:"",
        phone:"",
        email:"",
        password:"",
        passwordConfirm:"",
        hearth:"",
    });



    /**
     * modifie le nom dans l'onglet a l'ouverture
     * rajoute le role dans l'inscription
     */
    useEffect(() => {
        document.title = "Nouveau Utilisateur";
        setRegister({
            ...register,
            ['hearth']:"/api/hearths/"+id,
            roles
        });

    }, []);

    /**
     * Gestion des champs
     * @param currentTarget
     */
    const handleChange = ({currentTarget})=>{
        const {name,value}= currentTarget;
        setRegister({...register,[name]:value});

    };


    /**
     * Gestion de la soumission
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit = async (event)=> {
        event.preventDefault();
        const apiErrors = {};
        if (register.password !== register.passwordConfirm){
            apiErrors.passwordConfirm =
                "Mot de passe différent de l'original"
            setErrors(apiErrors);
            return;
        }
        try{
            await axios.post("https://127.0.0.1:8000/api/users", register );
            setErrors({});
            toast.success("Vous vous êtes inscrit, vous pouvez vous connecter !")
            history.replace('/login');

        }catch(error){
            const {violations} = error.response.data
            if(violations) {
                violations.forEach(violation=>{
                    apiErrors[violation.propertyPath]= violation.message;
                });
                setErrors(apiErrors);
                console.log(apiErrors)
                toast.error("Des erreurs dans le formulaires!")
            };

        }
    };

    console.log(register)




    return(
                <>
                    <div className="login_box">
                            <h1>Inscrivez-vous en qualité d’un membre de la direction </h1>



                        <form
                            onSubmit={handleSubmit}
                            className="login_box_form"
                        >


                            <Field
                                label="Poste"
                                name='work'
                                value={register.work}
                                onChange={handleChange}
                                error={errors.work}/>


                            <Field
                                label="Prénom"
                                name='firstName'
                                value={register.firstName}
                                onChange={handleChange}
                                error={errors.firstName}/>


                            <Field
                                label="Nom"
                                name='lastName'
                                value={register.lastName}
                                onChange={handleChange}
                                error={errors.lastName}/>

                            <Field
                                label="Télephone"
                                name='phone'
                                type="tel"
                                placeholder="0653648562"
                                value={register.phone}
                                onChange={handleChange}
                                error={errors.phone}/>

                            <Field
                                label="email"
                                name='email'
                                type="email"
                                value={register.email}
                                onChange={handleChange}
                                error={errors.email}/>

                            <Field
                                label="Mot de passe"
                                name='password'
                                type="password"
                                placeholder="Mot de passe"
                                value={register.password}
                                onChange={handleChange}
                                error={errors.password}/>


                            <Field
                                label="Confirmation du mot de passe"
                                name='passwordConfirm'
                                type="password"
                                placeholder="Mot de passe"
                                value={register.passwordConfirm}
                                onChange={handleChange}
                                error={errors.passwordConfirm}/>

                            <div className="form-group d-flex justify-content-center">

                                <button type="submit" className=" btn btn-gold">Confirmation</button>

                                <Link to="/login" className="btn btn-link">j'ai déja un compte</Link>
                            </div>

                        </form>


                        </div>
                </>
    )
}