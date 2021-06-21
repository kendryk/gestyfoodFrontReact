import React, {useContext, useEffect, useState} from 'react';
import './login.scss'
import AuthAPI from "../../services/AuthAPI";
import AuthContext from "../../contexts/AuthContext";
import { Link} from "react-router-dom";
import {toast} from "react-toastify";


export default function LoginPage({ history}){

    /**
     * Appel le context pour modifier Identification
     */

    const {setIsAuthenticated} = useContext(AuthContext);

    /**
     * Affiche le nom de la page à l'ouverture de celle-ci
     */
    useEffect(() => {
        document.title = "Login"
    }, []);

    /**
     * Initialise et modifie les identités des personnes connecter
     */
    const[credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    /**
     * Initialise et modifie les error
     */
    const  [error, setError] = useState();

    /**
     * Gestion des champs Piece identité
     * @param currentTarget
     */
    const handleChange = ({currentTarget})=>{
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]:value});
    };

    /**
     * Gestion des Submits
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            await AuthAPI.authenticate(credentials);
            setError(false);
            setIsAuthenticated(true);
            toast.success("Vous êtes désormais connecté !")
            history.replace('/dashboardHome');
            }catch(error){
                setError(
                "Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas. ");
                toast.error("une Erreur est survenue!")
            }
    };
    return(
        <div className="login_main">
        <div className="login_box">
            <h1>Veuillez vous connecter</h1>

            <form onSubmit={handleSubmit}
                  className="login_box_form"
            >
                <div className="form-group">
                    <label htmlFor="username"> Adresse email</label>
                    <input
                        value={credentials.username}
                        onChange={handleChange}
                        type="email"
                        placeholder="Adresse email de connexion"
                        name='username'
                        id='username'
                        className={"form-control" + (error?  " is-invalid": " ")}
                    />
                    {error && <p className="invalid-feedback alert alert-danger">{error} </p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        value={credentials.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Mot de passe"
                        name='password'
                        id='password'
                        className={"form-control"}/>
                </div>

                <div className="form-group d-flex justify-content-center align-items-center">
                    <button type="submit" className="btn btn-gold mx-2" >Connectez-vous</button>
                    <Link to="/createNewHearth">Vous n'êtes toujours pas inscrit ?</Link>
                </div>
            </form>
        </div>
        </div>
    )
}