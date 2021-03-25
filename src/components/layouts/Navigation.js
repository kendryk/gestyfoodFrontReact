import React from 'react';
import {NavLink, Link} from "react-router-dom";
import AuthAPI from "../services/AuthAPI";


export default function Navigation({isAuthenticated,onLogout, history}){

    const  handleLogout = ()=> {
        AuthAPI.logout();
        onLogout(false);
        history.push("/login")
    }
    return(

            <nav className="navbar navbar-expand-lg navbar-black">
                <div className="container-fluid">

                    {(!isAuthenticated  && (
                        <>
                    <Link to='/' className='navbar-brand'>
                        <img src="" alt="LOGO"/>
                    </Link>



                            <NavLink exact to="/" href="#" className="">Accueil</NavLink>
                            <NavLink exact to="/about" href="#" className="">A Propos</NavLink>
                            <NavLink exact to="/notice" href="#" className="">Notice</NavLink>


                            <NavLink exact to="/login" href="#" className="btn btn-info my-2 mx-2">Se Connecter</NavLink>

                        </>
                    )) || (
                        <>
                        <Link to='#' className='navbar-brand'>
                            <img src="" alt="LOGO"/>
                        </Link>

                        <button onClick={handleLogout} className="btn btn-danger my-2 mx-2">Se Deconnecter</button>
                        </>
                    )
                    }

                </div>
            </nav>


    );
}