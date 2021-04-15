import React, {useContext, useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import Pagination from "../../components/layouts/Pagination";
import moment from "moment";
import UnityAPI from "../../services/UnityAPI";
import './unity.scss'
import {Link} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";
import TableLoader from "../../components/loaders/TableLoader";
import AuthContext from "../../contexts/AuthContext";
import {toast} from "react-toastify";

export default function UnityPage({history}) {

    const {setIsAuthenticated} = useContext(AuthContext)


    const  handleLogout = ()=> {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté ")
        history.push("/login")
    }


    const  [userIdentified, setUserIdentified] = useState("");
    const [residents, setResidents] = useState([]);
    const [currentPage, setCurrentPage]= useState(1);
    const [loading,setLoading] = useState(true);
    const[search,setSearch] = useState("");

    const idLocation = window.location.pathname.split( "/" )[3];

    const nameLocation = window.location.pathname.split( "/" )[4];

    /**
     * recupère l'identité de la personne connecté.
     * @constructor
     */
    const NameIndentified = ()=>{
        try{
            const authAPI = AuthAPI.isAuthenticatedName();
            setUserIdentified (authAPI);
            console.log(userIdentified)
        }catch(error){
            console.log(error)
        }
    }


    /**
     * connaitre le nombre d'element par page.
     */
    const itemsPerPage = 5;

    /**
     * Récupere les résidents aupres de l'API
     */
    const fetchResidents = async () => {
        try{
            const data = await UnityAPI.findAll(idLocation);
            setResidents(data);
            setLoading(false);
        }catch(error){
            console.log(error.response)
            handleLogout()
        }
    };

    /**
     * Charger les residents au chargmentde la page.
     */
    useEffect(() => {
        NameIndentified();
        fetchResidents();
    }, []);


    /**
     * Modification du format de la date.
     * @param str
     * @returns {string}
     */
    const formatDate = (str) => moment(str).format("DD/MM/YYYY");


    /**
     * Modifier la page current
     * @param page
     */
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    /**
     * Gestion de la recherche
     * @param currentTarget
     */
    const handleSearch= ({currentTarget})=> {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    /**
     * Filtrage des unities en fonction de la recherche
     * @type {*[]}
     */
    const filterResidents = residents.filter(
        r =>
            r.unity.name.toLowerCase().includes(search.toLowerCase()) ||
            r.firstName.toLowerCase().includes(search.toLowerCase()) ||
            r.lastName.toLowerCase().includes(search.toLowerCase())||
            r.room.toLowerCase().includes(search.toLowerCase())||
            r.lastName.toLowerCase().includes(search.toLowerCase()));


    /**
     * pagination des données
     */
    const paginationResidents = Pagination.getData(
        filterResidents,
        currentPage,
        itemsPerPage);

    return(
        <>


            <div className="d-flex">
                <Aside/>

                <section className="p-5 section_home bg_white bdr-bs">
                    {!userIdentified ? ['Aucun utilisateur'] :
                        <div>
                            <strong>
                                <p>  {`${userIdentified.firstName}  ${userIdentified.lastName} vous êtes au foyer ${userIdentified.hearthName}`}</p>
                            </strong>
                        </div>}

                    <div className="unities_top">
                        <div>
                            <h1>Bienvenue </h1>

                            <p>Ici vous  visualisez l'unité {nameLocation},
                                Vous pouvez crée de nouvelle fiche de résident ou les modifier, supprimer.</p>
                        </div>
                        <div className="unities_top_button">
                            <Link to={`/dashboardUnities/unity/${idLocation}/${nameLocation}/new`} className="btn btn-gold">Nouveau résidents</Link>
                        </div>

                    </div>


                    <div className="form-group">
                    <input
                        type="text"
                        onChange={handleSearch}
                        value={search}
                        className="form-control"
                        placeholder="Rechercher..."/>
                    </div>



                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th className="text-center">N° de chambre</th>
                            <th className="text-center">Nom</th>
                            <th className="text-center">Prénom</th>
                            <th className="text-center">Date de naissance</th>
                            <th className="text-center">Date de Création  </th>
                            <th className="text-center">Date de modification</th>
                            <th/>
                        </tr>
                        </thead>
                        {!loading && <tbody>

                        {paginationResidents.map(resident =>
                            <tr key={resident.id} className="vertical-text-center">
                                <td className="text-center">{resident.room}</td>
                                <td className="text-center">{resident.firstName}</td>
                                <td className="text-center">{resident.lastName}</td>
                                <td className="text-center">{formatDate(resident.bornAt)}</td>
                                <td className="text-center">{formatDate(resident.createdAt)}</td>
                                <td className="text-center">{formatDate(resident.updateAt)}</td>

                                <Link to={`/dashboardUnities/unity/${idLocation}/${nameLocation}/${resident.id}`} className=" m-1 btn btn-info">Modifier</Link>



                            </tr>)}
                        </tbody>}
                    </table>
                    {loading &&<TableLoader/>}
                    <div className="form-group d-flex justify-content-center">

                        <Link to='/dashboardUnities' className="btn btn-link"> Retour au tableau de bord </Link>
                    </div>


                    {itemsPerPage < filterResidents.length &&
                    (
                    <Pagination currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                length={filterResidents.length}
                                onPageChanged={handlePageChange}/>
                            )}
                </section>
            </div>


        </>
    )
}