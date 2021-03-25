import React ,{ useState }from 'react';

import AuthAPI from "../services/AuthAPI";


export default function LoginPageScreen({onLogin , history}){


    const[credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const  [error, setError] = useState();


    // Gestion des champs
    const handleChange = ({currentTarget})=>{
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]:value});
    };


    // Gestion des Submits
    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            await AuthAPI.authenticate(credentials);
            setError(false);
            onLogin(true);
            history.replace('/DashboardHomePageScreen');
            }catch(error){
                setError(
                "Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas. ");
            }
    };

    return(

        <div className="container">
            <h1>Je suis la LoginPageScreen</h1>

            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input
                        value={credentials.username}
                        onChange={handleChange}
                        type="email"
                        placeholder="Adresse email de connexion"
                        name='username'
                        id='username'
                        className={"from-control" + (error?  " is-invalid": " ")}
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
                        className={"from-control" }/>

                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Connecter-vous</button>
                </div>
            </form>



        </div>
    )
}