import React, {useContext, useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import {Link} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";
import "./gestyfoog.scss"
// import {ReactComponent as Check} from "../../img/arrow-down.svg"
// import moment from "moment";
import UnitiesAPi from "../../services/UnitiesAPI";
import UnityAPI from "../../services/UnityAPI";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import AuthContext from "../../contexts/AuthContext";
import {toast} from "react-toastify";
import axios from "axios";

export default function GestionFoodPage({history}){
    document.title = "Gestion Food";
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
    const [load,setLoad] = useState(true);
    const [week, setWeek]= useState({
        number: 1
    });
    const [year, setYear]= useState({
        number: new Date().getFullYear()
    });
    // const [date, setDate]= useState({
    //     data: new Date().toJSON()
    // });

    const [residentWeek, setResidentWeek] = useState([])

    const [stateCheck,setStateCheck]= useState('');

    // const [modifCheck,setModifCheck]= useState('');


    /**
     * Appel a l'ouverture de la page des identifiants, des unités
     */
    useEffect(() => {
        NameIndentified();
        fetchUnities().then();

    }, []);

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
     * Récupération des Unités
     * @param currentTarget
     * @constructor
     */
    const GetUnity =({currentTarget})=>{
        setUnity({...unity,
            'id': currentTarget.id,
            'value': currentTarget.value}
        );

        fetchResidents(currentTarget.id).then();
    };

    /**
     * Récupere les résidents aupres de l'API selon l'unité choisi
     */
    const fetchResidents = async (idLocation) => {
        try{
            const data = await UnityAPI.findAll(idLocation)
            setResidents(data);
            setLoading(!loading) ;
        }catch(error){
            console.log(` Error ${error.response}`);
            handleLogout()
        }
    };

    /**
     * Appel a l'ouverture de la page
     */
    useEffect(() => {
        JsDay();
        setResidentWeek([])
    }, [loading]);
    console.log(loading)

    useEffect(() => {
        JsArrayDay();
    }, [load]);

    const JsDay = ()=>{
        residents.map(resident =>
            resident.dayChecks.map( days =>
                fetchDays(days.id,resident.id,days.name,days.createdAt)
            )
        )
    }

    const fetchDays = async (daysId,residentId,daysWeek,daysCreatedAt) => {
        try{
            const data = await axios
                .get("https://127.0.0.1:8000/api/day_checks/"+daysId+"/days" )
                .then(response => response.data["hydra:member"]);
                var tableau_associa={
                    "residentID":residentId,
                    "daysWeek":daysWeek,
                    'daysCreatedAt':daysCreatedAt,
                    "data":data
                };
                setResidentWeek(residentWeek => [...residentWeek, tableau_associa])
                setLoad(!load);
        }catch(error){
            console.log(` Error ${error.response}`);
        }
    };

    // console.log('residents',residents)
    // console.log('residentWeek',residentWeek)


    const JsArrayDay = ()=>{
        const arrayDay = [];
        const residentWeekValue= Object.values(residentWeek)
        const dataWeek = residentWeekValue.map(resident =>
            resident.data.map(day => day.checkTime.split("|").map( ck =>
                arrayDay.push(resident.residentID + '|' + day.name + '|' + ck + '|' + resident.daysWeek + '|' + new Date(resident.daysCreatedAt).getFullYear()+ ":"+ true)
            )));
        const jsonDay = arrayDay.reduce( (prev, item) => {
            const curr = item.split(':');
            prev[curr[0]] = curr[1].indexOf('true') > -1;
            return prev;
        }, {});
        setStateCheck(jsonDay)
    }


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
        getPostCheck(currentTarget)
    };


    //si déja rempli:
    const getPostCheck=(currentTarget)=>{
        console.log(currentTarget.name)
    }


    // const searchWeekDate=(arg)=>{
    //     let d = new Date(arg.date);
    //     // renvoie le jour de la semaine
    //     d.setDate(d.getDate() - (d.getDay() + 6) % 7 + 3); // Nearest Thu
    //     let ms = d.valueOf(); // GMT
    //     d.setMonth(0);
    //     d.setDate(4); // Thu in Week 1
    //     return  Math.round((ms - d.valueOf()) / (7 * 864e5)) + 1;
    // };


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
    };


    const DayFilter=(id)=>{

        //tableau contenant les donnée de l'unité : console.log("rere",residentWeek)

        //creation du dictionaire residents qui va contenaire les informations de la base de données par resident
        let dico_res={};
        let dico_week={};
        let residnetId = ""
        //creation du dictionaire resident par weekEnd qui va contenire une liste d'informations de la base de données
        //boucle dans chaque entrée de notre tableau residentWeek

        for(let resident in residents){
            if(residents[resident].id === id){
                residnetId=residents[resident]
            }
        }

        for(let entry in residentWeek){

            let resident_id=residentWeek[entry].residentID //type str

            let week_name=residentWeek[entry].daysWeek //type str

            let data_list=residentWeek[entry].data //type Array

            let data_list_dd=[];

            for (let dd in data_list){
              data_list_dd = data_list[dd];

                        // if (data_list_dd.dayCheck === residnetId.dayCheck){
                        //     console.log('data_list_dd',data_list_dd.dayCheck)
                        // }

                }



            if (!dico_res[resident_id]) {
                dico_res[resident_id]=[];
            }
            dico_week[week_name]=data_list;
            dico_res[resident_id].push(dico_week[week_name]);
        }

        // console.log('dico_res[id]',dico_res[id]);

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

                                            {DayFilter(13)}
                                            {residentWeek.map(days =>
                                                days.data.map(day=>

                                            <td key= {day.id} rowSpan="3"> <strong>{day.name}</strong>
                                                     <div className={"checkboxFlex "} >
                                                         <input className="m-1"
                                                                type = "checkbox"
                                                                name={days.residentID+'|'+day.name+"|matin|"+ days.daysWeek+'|'+ new Date(days.daysCreatedAt).getFullYear()}
                                                                checked={stateCheck[days.residentID+'|'+day.name+"|matin|"+ days.daysWeek+'|'+ new Date(days.daysCreatedAt).getFullYear()]}
                                                                onChange={handleCheckChange}
                                                            />
                                                        <label htmlFor={day.name+"-matin"}>Matin</label>

                                                         <input className="m-1"
                                                                type = "checkbox"
                                                                name={days.residentID+'|'+day.name+"|midi|"+ days.daysWeek+'|'+ new Date(days.daysCreatedAt).getFullYear()}
                                                                checked={stateCheck[days.residentID+'|'+day.name+"|midi|"+ days.daysWeek+'|'+ new Date(days.daysCreatedAt).getFullYear()]}
                                                                onChange={handleCheckChange}
                                                            />
                                                         <label htmlFor={day.name+"-matin"}>Midi</label>

                                                        <input className="m-1"
                                                               type = "checkbox"
                                                               name={days.residentID+'|'+day.name+"|soir|"+ days.daysWeek+'|'+ new Date(days.daysCreatedAt).getFullYear()}
                                                               checked={stateCheck[days.residentID+'|'+day.name+"|soir|"+ days.daysWeek+'|'+ new Date(days.daysCreatedAt).getFullYear()]}
                                                               onChange={handleCheckChange}
                                                             />
                                                         <label htmlFor={day.name+"-matin"}>Soir</label>
                                                 </div>
                                             </td>
                                                )
                                                )
                                                }
                                            <tr>
                                                <td key="DIET" rowSpan="1">
                                                    <div className='CheckChoice'>
                                                        {/*{resident.dayChecks[0].diet.name}*/}
                                                        {/*mode edition */}
                                                        {/*<Check className='svg-check'/>*/}
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td key="TEXTURE" rowSpan="1">
                                                    <div className='CheckChoice'>
                                                        {/*{resident.dayChecks[0].texture.name}*/}
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