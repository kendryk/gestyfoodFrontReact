import React, {useEffect, useState} from 'react';
import Field from "../../components/forms/Field";
import { Link} from "react-router-dom";
import axios from "axios";
import Select from "../../components/forms/Select";
export default function CreateNewRegisterPage({history}){

    useEffect(() => {
        document.title = "Nouveaux register"
    }, []);

    const roles=["ROLE_DIRECTOR"];

    const [register,setRegister] = useState ({
        work: "",
        firstName: "",
        lastName:"",
        phone:"",
        email:"",
        password:"",
        passwordConfirm:""


    });

    const [errors, setErrors] = useState({
        work: "",
        firstName: "",
        lastName:"",
        phone:"",
        email:"",
        password:"",
        passwordConfirm:""
    });


    const handleChange = ({currentTarget})=>{
        const {name,value}= currentTarget;
        setRegister({...register,[name]:value});
    };

    console.log(register)
    const handleSubmit = async (event)=> {
        event.preventDefault();
        setRegister({...register,roles});

        console.log(register)
        const apiErrors = {};
        if (register.password !== register.passwordConfirm){
            apiErrors.passwordConfirm =
                "Mot de passe différent de l'original"
            setErrors(apiErrors);
            return;
        }

        try{
             await axios.post("https://127.0.0.1:8000/api/users", register );

            setErrors({});
            history.replace('/createNewHearthPage');

        }catch(error){
            const {violations} = error.response.data
            if(violations) {
                violations.forEach(violation=>{
                    apiErrors[violation.propertyPath]= violation.message;
                });
                setErrors(apiErrors);
                console.log(apiErrors)
            }
        }
    };

    return(
                <>
                    <div className="login_box">
                            <h1>Inscrivez-vous en qualité de directeur</h1>

                        <form
                            onSubmit={handleSubmit}
                            className="login_box_form"
                        >

                            <Field
                                label="Poste"
                                name='work'
                                value={register.work}
                                onChange={handleChange}
                                error={errors.register}/>


                            <Field
                                label="Prénom"
                                name='firstName'
                                value={register.firstName}
                                onChange={handleChange}
                                error={errors.register}/>


                            <Field
                                label="Nom"
                                name='lastName'
                                value={register.lastName}
                                onChange={handleChange}
                                error={errors.register}/>

                            <Field
                                label="Télephone"
                                name='phone'
                                type="tel"
                                placeholder="0653648562"
                                value={register.phone}
                                onChange={handleChange}
                                error={errors.register}/>

                            <Field
                                label="email"
                                name='email'
                                type="email"
                                value={register.email}
                                onChange={handleChange}
                                error={errors.register}/>

                            <Field
                                label="Mot de passe"
                                name='password'
                                type="password"
                                placeholder="Mot de passe"
                                value={register.password}
                                onChange={handleChange}
                                error={errors.register}/>


                            <Field
                                label="Confirmation du mot de passe"
                                name='passwordConfirm'
                                type="password"
                                placeholder="Mot de passe"
                                value={register.passwordConfirm}
                                onChange={handleChange}
                                error={errors.register}/>

                            <div className="form-group d-flex justify-content-center">
                                <button type="submit" className=" btn btn-gold">Confirmation</button>

                                <Link to="/login" className="btn btn-link">j'ai déja un compte</Link>
                            </div>

                        </form>


                        </div>
                </>
    )
}