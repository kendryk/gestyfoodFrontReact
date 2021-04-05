import React, { useEffect, useState} from 'react';
import Field from '../../components/forms/Field'
import axios from 'axios'

export default function CreateNewHearthPage({history}){

    /**
     * Affiche le nom de la page à l'ouverture de celle-ci
     */
    useEffect(() => {
        document.title = "Nouveaux Foyer";
    }, []);

    /**
     * Initialise et modifie les foyers
     */
    const [hearth,setHearth] = useState ({
        name: "",
        address:"",
        city:"",
        phone:"",
        email:"",
    });

    /**
     * Initialise et modifie les errors
     */
    const [errors, setErrors] = useState({
        name: "",
        address:"",
        city:"",
        phone:"",
        email:"",
    });

    /**
     * Gestion des champs
     * @param currentTarget
     */
    const handleChange = ({currentTarget})=>{
        const {name,value}= currentTarget;
        setHearth({...hearth,[name]:value});
    };

    /**
     * gestion des soumissions
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit = async (event)=> {
        event.preventDefault();
        try{
            const data = await axios
                .post("https://localhost:8000/api/hearths", hearth)
                .then(response =>  response.data.id)
            localStorage.setItem("id", data)
            localStorage.setItem("name", hearth.name)
            setErrors({});
            // recuperation de l'id de hearth && renvoyer à l'user
            history.replace('/createNewRegister/'+ data);

        }catch(error){
           if(error.response.data.violations) {
               const apiErrors = {};
               error.response.data.violations.forEach(violation=>{
                   apiErrors[violation.propertyPath]= violation.message;
               });
               setErrors(apiErrors);
           }
        }
    };

    return(
        <>

            <div className="login_box">
                <h1>Création de votre Foyer</h1>

                <form
                    className="login_box_form"
                    onSubmit={handleSubmit}
                >

                    <Field
                        label="Nom du foyer"
                        name='name'
                        value={hearth.name}
                        onChange={handleChange}
                        error={errors.name}/>

                    <Field
                        label="Adresse"
                        name='address'
                        value={hearth.address}
                        onChange={handleChange}
                        error={errors.address}/>

                    <Field
                        label="Ville"
                        name='city'
                        value={hearth.city}
                        onChange={handleChange}
                        error={errors.city}/>

                    <Field
                        label="Téléphone"
                        name='phone'
                        type="tel"
                        placeholder="0653648562- écriver vos numero attaché"
                        value= {hearth.phone}
                        onChange={handleChange}
                        error={errors.phone}/>

                    <Field
                        label="E-mail"
                        name='email'
                        type="email"
                        placeholder="email Asso"
                        value={hearth.email}
                        onChange={handleChange}
                        error={errors.email}/>



                    <div className="form-group d-flex justify-content-center">
                        <button type="submit" className="btn btn-gold">Enregistrer</button>

                    </div>
                </form>


            </div>
        </>
    )
}