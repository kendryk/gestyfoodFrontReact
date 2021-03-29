import React, {useEffect, useState} from 'react';
import { Link} from "react-router-dom";
import Aside from "../../layouts/Aside";
import './dashboardUnities.scss';
import Pagination from "../../layouts/Pagination"
import UnitiesAPi from "../../../services/UnitiesAPi";

export default function DashboardUnitiesScreen(){


        console.log(window.location);

        const [unities, setUnities] = useState([]);
        const [currentPage, setCurrentPage]= useState(1);
        const [loading,setLoading] = useState(true);
        const[search,setSearch] = useState("");

    // Récupere les unités
    const fetchUnities = async () => {
        try{
            const data = await UnitiesAPi.findAll()
            setUnities(data)
            setLoading(false)
        }catch(error){
            console.log(error.response)
        }
    }

    // A Chargement de la page , on ira chercher les unité.
    useEffect(() => {
        fetchUnities();
    }, []);

    // Gestion de la suppresion d'une unités todo mettre dans unity modif
    const handleDelete = async (id) => {
        //on récupere une copie du tableau d'élèments
        const originalUnities =[...unities];
        // on filtre ce tableau  afin de ressortir touts les elements sauf celui qu'on a cliqué
        setUnities(unities.filter(unity => unity.id !==id))

        //on vérifie que l'utilisateur est sur de son choix
        // eslint-disable-next-line no-restricted-globals
        let val = confirm("Voulez-vous supprimer cette unité?");
        if (val === true) {
            //on vérifie que l'utilisateur est sur de son choix!
            // eslint-disable-next-line no-restricted-globals
            let val2 = confirm("Attention , il y aura pas de retour possible");
            //on envoie une requete a la base de donnée pour supprimer l'element
            if (val2 === true) {
                try {
                    await UnitiesAPi.delete(id)
                }catch (error){
                    setUnities(originalUnities);
                    console.log(error.response);
                }
            }
        }
    }

    // Modifier la page current
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    // Gestion de la recherche
    const handleSearch= ({currentTarget})=> {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    //connaitre le nombre de page par element.
    const itemsPerPage = 10;
    // construction d'une function qui part d'une page sur un nombre de page prédéfini
    // avec la methode slice qui renvoit la portion d'un  tableau ( copie) [indice de début, indice de fin]

    //Filtrage des unities en fonction de la recherche
    const filterUnities = unities.filter(u =>
         u.name.toLowerCase().includes(search.toLowerCase()));

    //Pagination des données
    const paginationUnities = Pagination.getData(
        filterUnities,
        currentPage,
        itemsPerPage);

    return(
        <>

            <div className="d-flex">
                <Aside/>
                <section className="p-5 section_home bg_white">
                    <div className="unities_top">
                        <div>
                        <h1>Bienvenue   </h1>
                        <p>Ici vous pouvez visualisez l'ensemble de vos unités,  en crée de nouvelle  ou en supprimer.</p>
                        </div>
                        <div className="unities_top_button">
                            <button className="btn btn-gold">Nouvelle Unité</button>
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
                        {paginationUnities.map(unity =>
                            <div>
                                <Link
                                    key={unity.id}
                                    to={{
                                        pathname: "/unity/"+unity.name,

                                        }}
                                    className='btn'>

                                <div
                                    className='unity_element'
                                    key={unity.id}
                                    style={{ backgroundImage: `url(${unity.photo})`
                                 }}>


                                    <div className='unity_who'>
                                        <div/>
                                        <div className='unity_box'>
                                            <h3>{unity.name}</h3>
                                            <h3>Nombre de résidents: {unity.residents.length}</h3>
                                        </div>
                                    </div>

                                </div>

                                </Link>


                                <div className='unity_update'>

                                    <button className='btn btn-update'> modif</button>
                                </div>
                            </div>
                        )}

                    </div>

       {/*version Table de donnée*/}

                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">Nom</th>
                            <th className="text-center">Nbr</th>
                            <th/>

                        </tr>
                        </thead>

                        <tbody>

                        {paginationUnities.map(unity =>
                            <tr key={unity.id}>
                            <td className="text-center">{unity.id}</td>
                            <td className="text-center">{unity.name}</td>
                            <td className="text-center">{unity.residents.length}</td>
                            <td><button
                                onClick={()=> handleDelete(unity.id)}
                                className="btn btn-sm btn-info"> modifier</button></td>
                        </tr>)}
                        </tbody>
                    </table>

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