import React, {Component} from 'react';


export default class Footer extends Component {

    render() {
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
                                        <a href="/" className=" nav-link text-white">À propos</a>
                                    </li>
                                    <li>
                                        <a href="/" className="text-white">Notice</a>
                                    </li>
                                    <li>
                                        <a href="/" className="text-white">Contactez-nous</a>
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
                                        <a href="/" className="text-white">CHARTE DES DONNÉES PERSONNELLES</a>
                                    </li>
                                    <li>
                                        <a href="/" className="text-white">CGU</a>
                                    </li>
                                    <li>
                                        <a href="/" className="text-white">POLITIQUE D’USAGE DES COOKIES</a>
                                    </li>
                                    <li>
                                        <a href="/" className="text-white">GESTION DES COOKIES
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
                        © 2021 Copyright: © gestyfood.fr  Tous droits réservés

                    </div>
                   {/*Copyright */}
                </footer>



            </>
        )
    }

}