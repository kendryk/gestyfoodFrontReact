import React, {useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import Pagination from "../../components/layouts/Pagination";
import moment from "moment";
import UnityAPI from "../../services/UnityAPI";
import './unity.scss'

export default function UnityPageScreen() {

    const [residents, setResidents] = useState([]);

    const [currentPage, setCurrentPage]= useState(1);
    const [loading,setLoading] = useState(true);
    const[search,setSearch] = useState("");

    const idLocation = window.location.pathname.split( "/" )[2];

    /**
     * connaitre le nombre d'element par page.
     */
    const itemsPerPage = 5;

    /**
     * Récupere les résidents aupres de l'API
     */
    const fetchResidents = async () => {
        try{
            const data = await UnityAPI.findAll();
            setResidents(data);
            setLoading(false);
        }catch(error){
            console.log(error.response)
        }
    };

    /**
     * Charger les residents au chargmentde la page.
     */
    useEffect(() => {
        fetchResidents();
    }, []);


    /**
     * Modification du format de la date.
     * @param str
     * @returns {string}
     */
    const formatDate = (str) => moment(str).format("DD/MM/YYYY");


    /**
     * Fonction de suppression de résidents.
     * @param id
     * @returns {Promise<void>}
     */
    const handleDelete = async (id) => {
        const originalResidents =[...residents];
        setResidents(residents.filter(resident => resident.id !==id))
        // eslint-disable-next-line no-restricted-globals
        let val = confirm("Voulez-vous supprimer ce résidents?");
        if (val === true) {
            // eslint-disable-next-line no-restricted-globals
            let val2 = confirm("Attention , il y aura pas de retour possible");
            if (val2 === true) {
                try {
                await UnityAPI.delete(id)
                }catch (error) {
                        setResidents(originalResidents);
                        console.log(error.response);
                    }
            }
        }
    };

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


    //todo liste des unités du foyer.


    return(
        <>


            <div className="d-flex">
                <Aside/>

                <section className="p-5 section_home bg_white">
                    <div className="unities_top">
                        <div>
                            <h1>Bienvenue    </h1>

                            <p>Ici vous  visualisez l'unité {idLocation},
                                Vous pouvez crée de nouvelle fiche de résidents ou les modifier  , supprimer.</p>
                        </div>
                        <div className="unities_top_button">
                            <button className="btn btn-gold">Nouveau résidents</button>
                        </div>

                    </div>

                    <div className='box_unities'>
                        <div className='box_unity' >
                            <h3>unity </h3>
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
                            <th className="text-center">unity</th>
                            <th className="text-center">N° de chambre</th>
                            <th className="text-center">Nom</th>
                            <th className="text-center">Prénom</th>
                            <th className="text-center">Date de naissance</th>
                            <th className="text-center">Date de Création  </th>
                            <th className="text-center">Date de modification</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {loading && (
                            <tr>
                                <td>Chargement .....</td>

                            </tr>
                        )}
                        {paginationResidents.map(resident =>
                            <tr key={resident.id}>
                                <td className="text-center">{resident.unity.name}</td>
                                <td className="text-center">{resident.room}</td>
                                <td className="text-center">{resident.firstName}</td>
                                <td className="text-center">{resident.lastName}</td>
                                <td className="text-center">{formatDate(resident.bornAt)}</td>
                                <td className="text-center">{formatDate(resident.createdAt)}</td>
                                <td className="text-center">{formatDate(resident.updateAt)}</td>
                                <td><button
                                    onClick={()=> handleDelete(resident.id)}
                                    className="btn btn-sm btn-info"> modifier</button></td>
                            </tr>)}
                        </tbody>
                    </table>

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