import React, {useEffect} from 'react';

export default function CreateNewHearthPageScreen(){

    useEffect(() => {
        document.title = "Nouveaux register"
    }, []);

    return(
        <>
            <div className="login_box">
                <h1>Création de votre Foyer</h1>

                <form
                    className="login_box_form"
                >
                    <div className="form-group">
                        <label > Nom du foyer</label>
                        <input


                            type="text"
                            placeholder="Nom du foyer"
                            name='name'
                            id='name'
                            className={"form-control"}
                        />

                    </div>

                    <div className="form-group">
                        <label >Adresse</label>
                        <input

                            type="text"
                            placeholder="Adresse"
                            name='address'
                            id='address'
                            className={"form-control"}/>

                    </div>

                    <div className="form-group">
                        <label > Ville</label>
                        <input


                            type="text"
                            placeholder="Ville"
                            name='city'
                            id='city'
                            className={"form-control"}
                        />

                    </div>

                    <div className="form-group">
                        <label >Téléphone</label>
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
                            placeholder="email Asso"
                            name='email'
                            id='email'
                            className={"form-control"}/>

                    </div>


                    <div className="form-group d-flex justify-content-center">
                        <button type="submit" className="btn btn-gold">Connecter-vous</button>
                    </div>
                </form>


            </div>
        </>
    )
}