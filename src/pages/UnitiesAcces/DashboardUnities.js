import React, {useContext, useEffect, useState} from 'react';
import { Link} from "react-router-dom";
import Aside from "../../components/layouts/Aside";
import './dashboardUnities.scss';
import Pagination from "../../components/layouts/Pagination"
import UnitiesAPi from "../../services/UnitiesAPI";
import AuthAPI from "../../services/AuthAPI";
import AuthContext from "../../contexts/AuthContext";
import {toast} from "react-toastify";


export default function DashboardUnities({history}){

    const {setIsAuthenticated} = useContext(AuthContext)


    const  handleLogout = ()=> {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté ")
        history.push("/login")
    }



    const [unities, setUnities] = useState([]);
    const [currentPage, setCurrentPage]= useState(1);
    const [loading,setLoading] = useState(true);
    const[search,setSearch] = useState("");
    const  [userIdentified, setUserIdentified] = useState("");

    /**
     * connaitre le nombre de page par element.
     * @type {number}
     */
    const itemsPerPage = 10;
    /**
     * Récupere les unités
     * @returns {Promise<void>}
     */
    const fetchUnities = async () => {
        try{
            const data = await UnitiesAPi.findAll()
            setUnities(data)
            setLoading(false)
        }catch(error){
            console.log(error.response)
            handleLogout()
        }
    };

    /**
     * cherche les unité a chaque chargement
     */
    useEffect(() => {
        fetchUnities();
    }, []);
    /**
     * cherche les unité a chaque chargement
     */
    useEffect(() => {
        NameIndentified();
    }, []);

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

    /**********************************************************************************************
     * construction d'une function qui renvoie une page sur un nombre de page prédéfini
     * avec la methode slice qui renvoit la portion d'un  tableau ( copie) [indice de début, indice de fin]
     *****************************************************************************************************/

    /**
     * Filtrage des unities en fonction de la recherche
     * @type {*[]}
     */
    const filterUnities = (unities === undefined) ?'nothing' :  unities.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));


    /**
     * Pagination des données
     */
    const paginationUnities = Pagination.getData(
        filterUnities,
        currentPage,
        itemsPerPage);

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
                        <h1>Tableau de bord des Unités   </h1>
                        <p>Ici vous pouvez visualisez l'ensemble de vos unités,  en crée de nouvelle  ou en supprimer.</p>
                        </div>
                        <div className="unities_top_button">
                            <Link to="/dashboardUnities/new" className="btn btn-gold">Nouvelle Unité</Link>
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

                    {/* emplacement des unities*/}

                    <div className="unities_all">

                        {loading && (
                                <p>Chargement...</p>
                        )}
                        {(unities === undefined)?'nothing' : paginationUnities.map(unity =>
                            <div key={unity.id}>
                                <Link
                                    to={{
                                        pathname: "/dashboardUnities/unity/"+unity.id+"/"+unity.name,

                                        }}
                                    className='btn '>

                                <div
                                    className='unity_element'
                                    style={{ backgroundImage: `url(${unity.photo})`
                                 }}>


                                    <div className='unity_who'>
                                        <div/>
                                        <div className='unity_box'>

                                            <h3 className="text-capitalize">{unity.name}</h3>
                                            <h3>Nombre de résidents: {unity.residents.length}</h3>
                                        </div>
                                    </div>

                                </div>

                                </Link>


                                <div className='unity_update'>


                                    <Link
                                        to={{
                                            pathname: "/dashboardUnities/"+unity.id,
                                        }}
                                        className='btn btn-update'
                                    >
                                        modif
                                    </Link>

                                </div>
                            </div>
                        )}

                    </div>


                    {itemsPerPage < filterUnities.length &&
                    (
                        <Pagination currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                length={filterUnities.length}
                                onPageChanged={handlePageChange}/>
                                )
                    }
                </section>
            </div>


        </>
    )
}