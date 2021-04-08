import React from 'react';
import {NavLink} from "react-router-dom";


export default function Footer () {

    const d = new Date();
    const date = d.getFullYear();


        return (
            <>
                <footer className="bg-dark   text-white">
                    {/*Grid container */}
                    <div className="container p-4">
                        {/*Grid row*/}
                        <div className="row">
                          {/*Grid column*/}
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase">Menu</h5>

                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <a href="/" className="nav-link text-white">Accueil</a>
                                    </li>
                                    <li>
                                        <NavLink exact to="/about"  className=" nav-link text-white">À propos</NavLink>
                                    </li>
                                    <li>
                                        <NavLink exact to="/notice" className="nav-link text-white">Notice</NavLink>
                                    </li>
                                    <li>
                                        <a href="/" className="nav-link text-white">Contactez-nous</a>
                                    </li>
                                </ul>
                            </div>
                            {/*Grid column*/}

                            {/*Grid column*/}
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">

                            </div>
                            {/*Grid column*/}

                            {/*Grid column*/}
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">

                            </div>
                            {/*Grid column*/}

                            {/*Grid column*/}
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase mb-0">  MENTIONS LÉGALES</h5>

                                <ul className="list-unstyled">

                                    <li>
                                        <a href="/" className="nav-link text-white">CHARTE DES DONNÉES PERSONNELLES</a>
                                    </li>
                                    <li>
                                        <a href="/" className="nav-link text-white">CGU</a>
                                    </li>
                                    <li>
                                        <a href="/" className="nav-link text-white">POLITIQUE D’USAGE DES COOKIES</a>
                                    </li>
                                    <li>
                                        <a href="/" className="nav-link text-white">GESTION DES COOKIES
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/*Grid column*/}
                        </div>
                        {/*Grid row*/}
                    </div>
                     {/*Grid container */}

                   {/*Copyright */}
                    <div className="text-center p-3">
                        ©{date} Copyright: gestyfood.fr  Tous droits réservés

                    </div>
                   {/*Copyright */}
                </footer>



            </>
        )
    }

