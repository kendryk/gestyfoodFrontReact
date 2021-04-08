import React, {useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import {Link} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";
import Select from "../../components/forms/Select";
import "./gestyfoog.scss"
import {ReactComponent as Check} from "../../img/arrow-down.svg"
import UnitiesAPi from "../../services/UnitiesAPI";
import UnityAPI from "../../services/UnityAPI";

export default function GestionFoodPage(){

    const  [userIdentified, setUserIdentified] = useState("");
    const [unities, setUnities] = useState([]);
    const [unity, setUnity] =useState({
        id:"",
        value:''
    });

    const [residents, setResidents] = useState([]);


    const [loading,setLoading] = useState(true);
    const [semaines, setSemaines] = useState([])
    const [week, setWeek]= useState({
        number: 'Semaine 1'
    })

    const [years, setYears] = useState([])
    const [year, setYear]= useState({
        number: ''
    })

    const [dayChecks, setDayChecks]= useState([

    ])

    const [checkTime, setCheckTime]= useState({

    })
    const [checked, setChecked] = useState(true);


    /**
     * Récupere les unités
     * @returns {Promise<void>}
     */
    const fetchUnities = async () => {
        try{
            const data = await UnitiesAPi.findAll()
            setUnities(data)
        }catch(error){
            console.log(error.response)
        }
    };

    /**
     * Récupere les résidents aupres de l'API
     */
    const fetchResidents = async (idLocation) => {
        try{
            const data = await UnityAPI.findAll(idLocation)
            setResidents(data);
            setLoading(false);
            console.log(data)
        }catch(error){
            console.log(error.response)
        }
    };

    console.log(residents)


    // Recupération du jour de création  pour afficher la semaine en course
    //essai
    const dateCreation = "2021-04-21T00:00:00+00:00";

    /**
     * Renvoie le jour de la semaine
     * @returns {number}
     */
    const  getWeekNumber = (dateCreation)=> {
        let d = new Date(dateCreation);
        console.log(d)
        // renvoie le jour de la semaine
        let DoW = d.getDay();

        d.setDate(d.getDate() - (DoW + 6) % 7 + 3); // Nearest Thu
        let ms = d.valueOf(); // GMT
        d.setMonth(0);
        d.setDate(4); // Thu in Week 1
        return Math.round((ms - d.valueOf()) / (7 * 864e5)) + 1;
    }
    console.log(getWeekNumber(dateCreation))





    /**
     * Apple a l'ouverture de la page des identifiants, des unités, des weeks et des Years
     */
    useEffect(() => {
        document.title = "Gestion Food";
        NameIndentified();
        fetchUnities();
        weeksAll();
        yearsAll();

    }, []);

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
     * Gestion des champs des semaines
     * @param currentTarget
     */
    const handleWeekChange = ({currentTarget})=>{
        const {name,value}= currentTarget;
        setWeek({...week,[name]:value});
        // console.log(week)
    };

    /**
     * Gestion des champs des années
     * @param currentTarget
     */
    const handleYearChange = ({currentTarget})=>{
        const {name,value}= currentTarget;
        setYear({...year,[name]:value});
        // console.log(year)
    };


    /**
     * Récupération des Unités
     * @param currentTarget
     * @constructor
     */
    const GetUnity =({currentTarget})=>{
        if(currentTarget.id === unity.id){
        setUnity({...unity,
            ['id']: currentTarget.id,
            ['value']: currentTarget.value}
            );
            fetchResidents(currentTarget.id);
        }
        setUnity({...unity,
            ['id']: currentTarget.id,
            ['value']: currentTarget.value}
        );
        fetchResidents(currentTarget.id);
    }



    /**
     * Recuperation de la semaine
     */
    const weeksAll =()=>{
        let week_array = [];
        for(let i =1; i < 53; i++){
            week_array.push(`Semaine ${i}`);
            setSemaines(week_array)
        }
    }


    /**
     * Recuperation de l'année
     * @type {Date}
     */
    const d = new Date();
    const date = d.getFullYear();
    const yearsAll =()=>{
        let year_array = [];
        for(let i = (date - 1); i < (date + 15); i++){
            year_array.push(` ${i}`);
            setYears(year_array)
        }
    }

    return(

    <>

        <div className="d-flex">
            <Aside/>
            <section className="p-4 section_home bg_white bdr-bs">

                {!userIdentified ? ['Aucun utilisateur'] :
                    <div>
                        <strong>
                            <p>  {`${userIdentified.firstName}  ${userIdentified.lastName} vous êtes au foyer ${userIdentified.hearthName}`}</p>
                        </strong>
                    </div>}
                <div className="unities_top">
                    <div>
                        <h1> Page De gestion des Présences Repas par unité.</h1>
                        <p>Ici vous pouvez gérer les presences aux repas
                            des residents selon leur unité. </p>
                        <p>Veuillez Choisir une unité pour commencer.</p>
                    </div>
                </div>

                <div>
                    <div className="border d-flex justify-content-around">

                        <Select
                            name="number"
                            label="Semaine"
                            value={week.number}
                            onChange={handleWeekChange}
                        >
                            {semaines.map(week =>
                                <option value={week}>{week}</option>
                            )}

                        </Select>

                        <Select
                            name="number"
                            label="Année"
                            value={year.number}
                            onChange={handleYearChange}
                        >
                            {years.map(year =>
                                <option value={year}>{year}</option>
                            )}
                        </Select>

                    </div>

                    <div  className="border d-flex justify-content-around my-3">



                        {(unities === undefined)?'nothing' : unities.map(unity =>
                        <button
                            key={unity.id}
                            id = {unity.id}
                            value={unity.name}
                            onClick={(e)=>GetUnity(e)}
                            className="box-unity">
                            {unity.name}
                        </button>

                        )}
                    </div>

                    {(unity.id === "") ?
                        <h2 className='text-center'>Vous n'avez pas choisi d'unité</h2>
                        :<h2 className='text-center'>Vous avez choici {unity.value}</h2>
                    }

                    <div className="my-5">
                        {loading && (
                            <div>
                                <td>Chargement .....</td>

                            </div>
                        )}
                        {(residents.length === 0)  ?

                                <div className="d-flex justify-content-center ">
                                    {(unity.id === "") ? "" :
                                        <Link to={`/dashboardUnities/unity/${unity.id}/${unity.name}/new`} className="btn btn-gold">Pas de residents veuillez en crée!</Link>
                                    }
                                </div>

                            : residents.map(resident =>


                        <table className="table table-residents" key={resident.id}>
                            <thead>
                            <tr>
                                <th  className="border-right" colSpan="2">N°Chambre: {resident.room}</th>
                                <th  className="border-right" colSpan="2">{resident.firstName}</th>
                                <th  className="border-right" colSpan="2">{resident.lastName}</th>
                                <th  className="border-right" colSpan="2">{week.number}</th>

                            </tr>
                            </thead>
                            <tbody>

                            <tr>
                               {/*todo tableaux resident.dayChecks === semaine*/}
                                {resident.dayChecks.map(day =>
                                    <td key={day.id} rowSpan="2"> <strong>{day.name}</strong>
                                    <div className="checkboxFlex " >
                                        <input className="m-1"
                                               type="checkbox"
                                               id="matin"
                                               name="matin"

                                               />
                                        <label htmlFor="matin">Matin</label>
                                        <input className="m-1"
                                               type="checkbox"
                                               id="midi"
                                               name="midi"
                                               />
                                        <label htmlFor="midi">Midi</label>
                                        <input
                                            className="m-1"
                                            type="checkbox"
                                            id="Soir"
                                            name="Soir"
                                              />
                                        <label htmlFor="Soir">Soir</label>
                                    </div>
                                </td>
                                )}


                                <td>
                                    <div className='CheckChoice'>
                                        {/*{resident.dayChecks[0].diet.name}*/}
                                        {/*mode edition */}
                                        {/*<Check className='svg-check'/>*/}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='CheckChoice'>
                                        {/*{resident.dayChecks[0].texture.name}*/}
                                        {/*mode edition */}
                                        {/*<Check className='svg-check'/>*/}
                                    </div>

                                </td>
                            </tr>
                            </tbody>

                        </table>
                        )}


                    </div>

                </div>


















            </section>







        </div>
    </>

)
}