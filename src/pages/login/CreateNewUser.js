import React, { useEffect, useState} from 'react';
import Field from '../../components/forms/Field'
import axios from 'axios'
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

export default function CreateNewUser({history}){

    const [load,setLoad] = useState ({
        load:false,
    })
    /**
     * Affiche le nom de la page à l'ouverture de celle-ci
     */
    useEffect(() => {
        document.title = "Nouvel Utilisateur";
        postRegister()
        return ()=> {
            console.log(register);
        }
    }, [load]);

    /**
     * Initialise et modifie les foyers
     */
    const [hearth,setHearth] = useState ({
        name: "",
        address:"",
        city:"",
        phoneHearth:"",
        emailHearth:"",
    });

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
     * Initialise et modifie les errors
     */
    const [errors, setErrors] = useState({
        name: "",
        address:"",
        city:"",
        phoneHearth:"",
        emailHearth:"",
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
     * Gestion des champs
     * @param currentTarget
     */
    const handleHearthChange = ({currentTarget})=>{
        const {name,value}= currentTarget;
        setHearth({...hearth,[name]:value});
    };

    /**
     * Gestion des champs
     * @param currentTarget
     */
    const handleUserChange = ({currentTarget})=>{
        const {name,value}= currentTarget;
        setRegister({...register,[name]:value});

    };

    /**
     * gestion des soumissions
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
            const data =await axios
                .post("https://localhost:8000/api/hearths", hearth)
                .then(response =>  response.data.id)
            setErrors({});
            setRegister({
                ...register,
                ['hearth']:"/api/hearths/"+ data,
                roles
            });
            setLoad(!load);



        }catch(error){
            if(error.response.data.violations) {
                const apiErrors = {};
                error.response.data.violations.forEach(violation=>{
                    apiErrors[violation.propertyPath]= violation.message;
                });
                setErrors(apiErrors);
                toast.error("Des erreurs dans le formulaire!")
            }

        }
    };


    const postRegister = async() => {
        console.log(roles);
        console.log(register);
        await axios.post("https://127.0.0.1:8000/api/users", register );
        setErrors({});
        toast.success("Vous vous êtes inscrit, vous pouvez vous connecter !")
        history.replace('/login');
    }



    return(
        <>

            <div className="login_box">
                <h2>Création de votre Foyer</h2>

                <form
                    className="login_box_form"
                    onSubmit={handleSubmit}
                >

                    <Field
                        label="Nom du foyer"
                        name='name'
                        value={hearth.name}
                        onChange={handleHearthChange}
                        error={errors.name}/>

                    <Field
                        label="Adresse"
                        name='address'
                        value={hearth.address}
                        onChange={handleHearthChange}
                        error={errors.address}/>

                    <Field
                        label="Ville"
                        name='city'
                        value={hearth.city}
                        onChange={handleHearthChange}
                        error={errors.city}/>

                    <Field
                        label="Téléphone de l'institution"
                        name='phoneHearth'
                        type="tel"
                        placeholder="0653648562- écriver vos numeros attaché"
                        value= {hearth.phoneHearth}
                        onChange={handleHearthChange}
                        error={errors.phoneHearth}/>

                    <Field
                        label="E-mail de l'institution"
                        name='emailHearth'
                        type="email"
                        placeholder="email Asso"
                        value={hearth.emailHearth}
                        onChange={handleHearthChange}
                        error={errors.emailHearth}/>

                    <h2>Inscrivez-vous en qualité d’un membre de la direction </h2>

                    <Field
                        label="Poste"
                        name='work'
                        value={register.work}
                        onChange={handleUserChange}
                        error={errors.work}/>


                    <Field
                        label="Prénom"
                        name='firstName'
                        value={register.firstName}
                        onChange={handleUserChange}
                        error={errors.firstName}/>


                    <Field
                        label="Nom"
                        name='lastName'
                        value={register.lastName}
                        onChange={handleUserChange}
                        error={errors.lastName}/>

                    <Field
                        label="Télephone"
                        name='phone'
                        type="tel"
                        placeholder="0653648562"
                        value={register.phone}
                        onChange={handleUserChange}
                        error={errors.phone}/>

                    <Field
                        label="email"
                        name='email'
                        type="email"
                        value={register.email}
                        onChange={handleUserChange}
                        error={errors.email}/>

                    <Field
                        label="Mot de passe"
                        name='password'
                        type="password"
                        placeholder="Mot de passe"
                        value={register.password}
                        onChange={handleUserChange}
                        error={errors.password}/>


                    <Field
                        label="Confirmation du mot de passe"
                        name='passwordConfirm'
                        type="password"
                        placeholder="Mot de passe"
                        value={register.passwordConfirm}
                        onChange={handleUserChange}
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