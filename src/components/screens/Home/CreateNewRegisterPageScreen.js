import React, {useEffect} from 'react';

export default function CreateNewRegisterPageScreen(){

    useEffect(() => {
        document.title = "Nouveaux register"
    }, []);

    return(
                <>
                    <div className="login_box">
                            <h1>Inscrivez vous en qualité de directeur</h1>

                        <form
                              className="login_box_form"
                        >
                            <div className="form-group">
                                <label > Prénom</label>
                                <input


                                    type="text"
                                    placeholder="Prénom"
                                    name='firstName'
                                    id='firstName'
                                    className={"form-control"}
                                />

                            </div>

                            <div className="form-group">
                                <label >Nom</label>
                                <input

                                    type="text"
                                    placeholder="Nom"
                                    name='lastName'
                                    id='lastName'
                                    className={"form-control"}/>

                            </div>

                            <div className="form-group">
                                <label >Télephone</label>
                                <input

                                    type="number"
                                    placeholder="0653648562"
                                    name='phone'
                                    id='phone'
                                    className={"form-control"}/>

                            </div>

                            <div className="form-group">
                                <label >E-mail</label>
                                <input

                                    type="email"
                                    placeholder="email"
                                    name='email'
                                    id='email'
                                    className={"form-control"}/>

                            </div>

                            <div className="form-group">
                                <label >Mot de passe</label>
                                <input

                                    type="password"
                                    placeholder="Mot de passe"
                                    name='password'
                                    id='password'
                                    className={"form-control"}/>

                            </div>

                            <div className="form-group">
                                <label >Répeter Mot de passe</label>
                                <input

                                    type="password"
                                    placeholder="Répeter Mot de passe"
                                    name='repeatPassword'
                                    id='repeatPassword'
                                    className={"form-control"}/>

                            </div>





                            <div className="form-group d-flex justify-content-center">
                                <button type="submit" className=" btn btn-gold">Connecter-vous</button>
                            </div>
                        </form>


                        </div>
                </>
    )
}