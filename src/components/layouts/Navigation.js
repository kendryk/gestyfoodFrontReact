import React, {useContext} from 'react';
import {NavLink, Link} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";
import './navigation.scss';
import AuthContext from "../../contexts/AuthContext";

export default function Navigation({ history}){

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
    const  handleLogout = ()=> {
        AuthAPI.logout();
        setIsAuthenticated(false);
        history.push("/login")
    }
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

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">



                                <li className="nav-item ">
                                    <NavLink exact to="/" className="nav-link buttonHeader">Accueil</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink exact to="/about"  className="nav-link buttonHeader">A Propos</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink exact to="/notice"  className="nav-link buttonHeader">Notice</NavLink>
                                </li>

                                <li className="nav-item d-flex flex-column">
                                    <NavLink exact to="/login"  className="btn btn-connection mb-2">Se Connecter</NavLink>

                                    <button onClick={() => handleSubmit('createNewHearth')}
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