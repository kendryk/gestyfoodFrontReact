import React, {useContext, useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import {Link} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";
import "./gestyfoog.scss"
// import {ReactComponent as Check} from "../../img/arrow-down.svg"
import UnitiesAPi from "../../services/UnitiesAPI";
import UnityAPI from "../../services/UnityAPI";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import AuthContext from "../../contexts/AuthContext";
import {toast} from "react-toastify";


export default function GestionFoodPage({history}){

    const {setIsAuthenticated} = useContext(AuthContext)

    /**
     * Deconnection
     */
    const  handleLogout = ()=> {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté ")
        history.push("/login")
    }


    const  [userIdentified, setUserIdentified] = useState("");
    const [unities, setUnities] = useState([]);
    const [unity, setUnity] =useState({
        id:"",
        value:''
    });

    const [residents, setResidents] = useState([]);
    const [loading,setLoading] = useState(true);
    const [week, setWeek]= useState({
        number: 1
    });
    const [year, setYear]= useState({
        number: new Date().getFullYear()
    });
    const [stateCheck,setStateCheck]= useState('');


    const [modifCheck,setModifCheck]= useState('');


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
        }catch(error){
            console.log(` Error ${error.response}`);
            handleLogout()
        }
    };


    const JsDay = ()=>{
        const arrayDay = [];
        residents.map(resident =>
            resident.dayChecks.map( day =>
                day.checkTime.split("|").map( v=>
                    arrayDay.push( resident.id + '|' + day.name + '|' + v + '|' + day.week + '|' + new Date(day.updateAt).getFullYear()+ ":"+ true)
                )
            )
        );
        console.log(arrayDay)
        const jsonDay = arrayDay.reduce( (prev, item) => {
            const curr = item.split(':');
            prev[curr[0]] = curr[1].indexOf('true') > -1;
            return prev;
        }, {});
        setStateCheck(jsonDay);
    }








    /**
     * Apple a l'ouverture de la page des identifiants, des unités, des weeks et des Years
     */
    useEffect(() => {
        document.title = "Gestion Food";
        NameIndentified();
        fetchUnities().then();
        JsDay();

    }, [loading]);

    /**
     * recupère l'identité de la personne connecté.
     * @constructor
     */
    const NameIndentified = ()=>{
        try{
            setUserIdentified(AuthAPI.isAuthenticatedName());
        }catch(error){
            console.log(error)
        }
    }


    //todo pour la partie modification.
    const handleCheckChange = ({currentTarget})=>{
        setStateCheck({...stateCheck, [currentTarget.name]:currentTarget.checked});

        setModifCheck({...modifCheck, [currentTarget.name]:currentTarget.checked});

    };

    console.log('modifCheck',modifCheck);


    const handleDateClick = (arg) => { // bind with an arrow function

        let YearDate = new Date(arg.date).getFullYear();

        setYear({...year,['number']:parseInt(YearDate)});
        let d = new Date(arg.date);
        // renvoie le jour de la semaine
        let DoW = d.getDay();
        d.setDate(d.getDate() - (DoW + 6) % 7 + 3); // Nearest Thu
        let ms = d.valueOf(); // GMT
        d.setMonth(0);
        d.setDate(4); // Thu in Week 1
        const weekDate= Math.round((ms - d.valueOf()) / (7 * 864e5)) + 1;
        setWeek({...week,['number']:parseInt(weekDate)});

        }

    /**
     * Récupération des Unités
     * @param currentTarget
     * @constructor
     */
    const GetUnity =({currentTarget})=>{
        setUnity({...unity,
            'id': currentTarget.id,
            'value': currentTarget.value}
        );
        setLoading(true);
        fetchResidents(currentTarget.id);
    };


    const filterDays =(wk)=>{
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
                        {(unity.id === "") ?
                            <p>Veuillez Choisir une unité pour commencer.</p>
                            :""}
                    </div>
                </div>

                <section>
                    <header className="border d-flex justify-content-around">
                    { (unity.id !== "")?
                    <div className="box-Calendar">
                    <div className="box-Calendar-main">
                        <FullCalendar
                            plugins={[ dayGridPlugin, interactionPlugin ]}
                            dateClick={handleDateClick}
                            selectable={true}
                            locale={"fr"}
                            buttonText={{today: "Aujourd'hui", month: "mois", week: "Semaine"}}
                        />
                    </div>
                    </div>
                        :""
                    }

                    <div  className="box-GestyUnities">
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
                    </header>
                    {(unity.id === "") ?
                        <h2 className='text-center'>Vous n'avez pas choisi d'unité</h2>
                        :
                        (
                            <>
                                <h2 className='text-center mt-5'>Vous avez choisi <strong>{unity.value}</strong></h2>
                                <div className='d-flex justify-content-end mx-5'>
                                    <button className='btn btn-primary'> Modifier</button>
                                </div>
                            </>
                        )
                    }

                    <div className="my-5">

                        {(residents.length === 0)  ? (

                                <div className="d-flex justify-content-center ">
                                    { (unity.id !== "")?
                                            <Link to={`/dashboardUnities/unity/${unity.id}/${unity.name}/new`} className="btn btn-gold">Pas de residents veuillez en crée!</Link>
                                        :""
                                    }
                                </div>

                            )
                            :
                            (

                            residents.map(resident =>
                                <table className="table table-residents" key={resident.id}>


                                    <thead>
                                    <tr>
                                        <th  className="border-right" colSpan="3">N°Chambre: {resident.room}</th>
                                        <th  className="border-right" colSpan="2">{resident.firstName}</th>
                                        <th  className="border-right" colSpan="2">{resident.lastName}</th>
                                        <th  className="border-right" colSpan="1">{"Semaine-"+week.number}</th>
                                        <th  className="border-right" colSpan="2">{year.number}</th>

                                    </tr>
                                    </thead>
                                    <tbody>

                                    {resident.dayChecks.length === 0 ?
                                        ""
                                        :
                                        resident.dayChecks.filter(wk=> (

                                            parseInt(wk.week) <= parseInt(week.number) ? wk.week : ''






                                        )).map(day =>

                                            <td key={day.id} rowSpan="3"> <strong>{day.name}</strong>
                                                <div className={"checkboxFlex " + day.week} >

                                                    <input className="m-1"
                                                           type = "checkbox"
                                                           name={resident.id+'|'+day.name+"|matin|"+ day.week+'|'+ new Date(day.updateAt).getFullYear()}
                                                           checked={stateCheck[resident.id+'|'+day.name+"|matin|"+ day.week+'|'+ new Date(day.updateAt).getFullYear()]}
                                                           onChange={handleCheckChange}
                                                    />
                                                    <label htmlFor={day.name+"-matin"}>Matin</label>


                                                    <input className="m-1"
                                                           type = "checkbox"
                                                           name={resident.id+'|'+ day.name +"|midi|"+ day.week+'|'+ new Date(day.updateAt).getFullYear()}
                                                           checked={stateCheck[resident.id+'|'+day.name+"|midi|"+ day.week+'|'+ new Date(day.updateAt).getFullYear()]}
                                                           onChange={handleCheckChange}
                                                    />
                                                    <label htmlFor={day.name+"-matin"}>Midi</label>


                                                    <input className="m-1"
                                                           type = "checkbox"
                                                           name={resident.id+'|'+day.name+"|soir|"+ day.week+'|'+ new Date(day.updateAt).getFullYear()}
                                                           checked={stateCheck[resident.id+'|'+day.name+"|soir|"+ day.week+'|'+ new Date(day.updateAt).getFullYear()]}
                                                           onChange={handleCheckChange}
                                                    />
                                                    <label htmlFor={day.name+"-matin"}>Soir</label>
                                                </div>

                                            </td>

                                        )
                                    }



                                        <tr>
                                            <td key="DIET" rowSpan="1">
                                                <div className='CheckChoice'>

                                                    {/*mode edition */}
                                                    {/*<Check className='svg-check'/>*/}
                                                </div>
                                            </td>
                                        </tr>




                                        <tr>
                                            <td key="TEXTURE" rowSpan="1">
                                                <div className='CheckChoice'>

                                                    {/*mode edition */}
                                                    {/*<Check className='svg-check'/>*/}
                                                </div>

                                            </td>
                                        </tr>


                                    </tbody>
                                </table>

                            )

                            )

                        }


                    </div>

                </section>


            </section>

        </div>
    </>

)
}