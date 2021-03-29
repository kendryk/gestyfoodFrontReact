import React from 'react';
import {NavLink, Link} from "react-router-dom";

import './navigation.scss';

export default function Aside({isAuthenticated,onLogout, history}){


    return(

        <nav className="aside_block">
            <div className="">

                {(!isAuthenticated  && (
                    <>

                        <div className="">

                            <ul className="navbar-nav aside_nav">

                                <li className="nav-item ">
                                    <NavLink exact to="/dashboardUnities"  className="nav-link buttonHeader">UNITES</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink exact to="/userPage"  className="nav-link buttonHeader">AUTORISATION</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink exact to="/gestionFoodPage"  className="nav-link buttonHeader">REPAS</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink exact to="/regimePage" className="nav-link buttonHeader">REGIME/TEXTURE</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink exact to="/preferencePage" className="nav-link buttonHeader">PREFERENCE</NavLink>
                                </li>
                            </ul>

                        </div>

                    </>
                ))
                }

            </div>
        </nav>

    );
}