import React, {useContext, useState} from 'react';
import {NavLink, Link} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";
import './navigation.scss';
import AuthContext from "../../contexts/AuthContext";
import {toast} from "react-toastify";

export default function Navigation({ history}){

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

    const  handleLogout = ()=> {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté ")
        history.push("/login")
    }

    const [show, setSchow] = useState(false);


    const handleSubmit =(element)=> {
        history.push("/"+element);
    }

    const logo= process.env.PUBLIC_URL + '/img/logo.png';


    return(

            <nav className="navbar navbar-expand-lg navbar-light bg_header">
                <div className="container-fluid">

                {(!isAuthenticated  && (
                <>
                    <Link to='/' className='navbar-brand'>
                        <img src={logo} alt="LOGO" width="150" height="150"/>
                    </Link>

                    <button className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={() => setSchow(!show)}
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div
                        className={
                            show
                                ? 'collapse navbar-collapse show'
                                : 'collapse navbar-collapse'
                        }>

                        <ul className="navbar-nav">



                                <li className="nav-item my-2">
                                    <NavLink exact to="/" className="nav-link buttonHeader">Accueil</NavLink>
                                </li>

                                <li className="nav-item my-2">
                                    <NavLink exact to="/about"  className="nav-link buttonHeader">A Propos</NavLink>
                                </li>

                                <li className="nav-item my-2">
                                    <NavLink exact to="/notice"  className="nav-link buttonHeader">Notice</NavLink>
                                </li>

                                <li className="nav-item d-flex flex-column my-2">
                                    <NavLink exact to="/login"  className="btn btn-connection mb-2">Se Connecter</NavLink>

                                    <button onClick={() => handleSubmit('createNewUser')}
                                            className="btn btn-gold ">Inscrivez-vous</button>

                                </li>

                        </ul>

                    </div>

                </>
                )) || (
                <>
                    <Link to='#' className='navbar-brand'>
                        <img src={logo} alt="LOGO" width="150" height="150"/>
                    </Link>

                    <button onClick={handleLogout} className="btn btn-danger my-2 mx-2">Se Deconnecter</button>
                </>
                    )
                    }



                </div>
            </nav>

    );
}