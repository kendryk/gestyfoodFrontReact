import React, {useEffect, useState} from 'react';
import {NavLink, Link} from "react-router-dom";

import './navigation.scss';
import AuthAPI from "../../services/AuthAPI";

export default function Aside({isAuthenticated}){

    const  [userIdentified, setUserIdentified] = useState("");

    /**
     * recupère l'identité de la personne connecté.
     * @constructor
     */
    const NameIndentified = ()=>{
        try{
            const authAPI = AuthAPI.isAuthenticatedName();
            setUserIdentified (authAPI);

        }catch(error){
            console.log(error)
        }
    }

    /**
     * Charger les texture /regime au chargement de la page.
     */
    useEffect(() => {
        NameIndentified();
    }, []);

    const Director = JSON.parse(JSON.stringify({0:["ROLE_DIRECTOR","ROLE_USER"]}));
    const Moderator = JSON.parse(JSON.stringify({0:["ROLE_MODERATOR","ROLE_USER"]}));
    const Editor = JSON.parse(JSON.stringify({0:["ROLE_EDITOR","ROLE_USER"]}));

    return(

        <nav className="aside_block">
            <div className="">

                {(!isAuthenticated  && (
                    <>

                        <div className="">

                            <ul className="navbar-nav aside_nav">

                                <li className="nav-item ">
                                    <NavLink exact to="/dashboardHome"  className="nav-link buttonHeader">TABLEAU DE BORD</NavLink>
                                </li>


                                {!userIdentified ? "":
                                    userIdentified.roles[0] !== Director[0][0]   ? '' :

                                <li className="nav-item ">
                                    <NavLink exact to="/dashboardUnities"  className="nav-link buttonHeader">UNITES</NavLink>
                                </li>
                                }

                                {!userIdentified ? "":
                                    userIdentified.roles[0] !== Moderator[0][0]   ? '' :

                                        <li className="nav-item ">
                                            <NavLink exact to="/dashboardUnities"  className="nav-link buttonHeader">UNITES</NavLink>
                                        </li>
                                }



                                {!userIdentified ? "":
                                    userIdentified.roles[0] !== Director[0][0]  ? '' :
                                <li className="nav-item">
                                    <NavLink exact to="/user"  className="nav-link buttonHeader">AUTORISATION</NavLink>
                                </li>
                                }



                                <li className="nav-item">
                                    <NavLink exact to="/gestionFood"  className="nav-link buttonHeader">REPAS</NavLink>
                                </li>



                                {!userIdentified ? "":
                                    userIdentified.roles[0] !== Director[0][0] ? '' :
                                <li className="nav-item">
                                    <NavLink exact to="/regime" className="nav-link buttonHeader">REGIME/TEXTURE</NavLink>
                                </li>
                                }

                                {!userIdentified ? "":
                                    userIdentified.roles[0] !== Moderator[0][0] ? '' :
                                        <li className="nav-item">
                                            <NavLink exact to="/regime" className="nav-link buttonHeader">REGIME/TEXTURE</NavLink>
                                        </li>
                                }
                                {!userIdentified ? "":
                                    userIdentified.roles[0] !== Editor[0][0] ? '' :
                                        <li className="nav-item">
                                            <NavLink exact to="/regime" className="nav-link buttonHeader">REGIME/TEXTURE</NavLink>
                                        </li>
                                }





                                {!userIdentified ? "":
                                    userIdentified.roles[0] !== Director[0][0] ? '' :
                                <li className="nav-item">
                                    <NavLink exact to="/preference" className="nav-link buttonHeader">PREFERENCE</NavLink>
                                </li>
                                }
                            </ul>

                        </div>

                    </>
                ))
                }

            </div>
        </nav>

    );
}