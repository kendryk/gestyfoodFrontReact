import React, {useEffect, useState} from 'react';
import Aside from "../../layouts/Aside";

import Pagination from "../../layouts/Pagination";
import axios from "axios";



export default function UnityPageScreen(history) {

    const [residents, setResidents] = useState([]);

    const [currentPage, setCurrentPage]= useState(1);
    const [loading,setLoading] = useState(true);


    // const idLocation = window.location.pathname.split( "/" )[2];



    useEffect(() => {

        axios
            .get("https://127.0.0.1:8000/api/residents")
            // .get(process.env.REACT_APP_API_URL+ '/residents') bug? todo a corriger
            .then(response => {
                setResidents(response.data["hydra:member"]);
                setLoading(false);
            })
            .catch(error => {console.log(error.response)})
    }, []);

    const handleDelete = (id) => {

        const originalResidents =[...residents];
        setResidents(residents.filter(resident => resident.id !==id))
        // eslint-disable-next-line no-restricted-globals
        let val = confirm("Voulez-vous supprimer cette unité?");
        if (val === true) {
            // eslint-disable-next-line no-restricted-globals
            let val2 = confirm("Attention , il y aura pas de retour possible");
            if (val2 === true) {
                axios.delete("https://127.0.0.1:8000/api/residents/" + id)
                    .then(response => console.log("ok"))
                    .catch(error => {
                        setResidents(originalResidents);
                        console.log(error.response);
                    });
            }
        }
    }
    // Modifier la page current
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    //connaitre le nombre de page par element.
    const itemsPerPage = 5;
    // construction d'une function qui part d'une page sur un nombre de page prédéfini
    // avec la methode slice qui renvoit la portion d'un  tableau ( copie) [indice de début, indice de fin]

    const paginationResidents = Pagination.getData(residents, currentPage, itemsPerPage);




    return(
        <>
            <div className="d-flex">
                <Aside/>

                <section className="p-5 section_home bg_white">
                    <div className="unities_top">
                        <div>
                            <h1>Bienvenue    </h1>



                            <p>Ici vous  visualisez l'unité ,
                                Vous pouvez crée de nouvelle fiche de résidents ou les modifier  , supprimer.</p>



                        </div>
                        <div className="unities_top_button">
                            <button className="btn btn-gold">Nouveau résidents</button>
                        </div>

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
                        <tbody>
                        {loading && (
                            <tr>
                                <td>Chargement .....</td>

                            </tr>
                        )}
                        {paginationResidents.map(resident =>
                            <tr key={resident.id}>
                                <td className="text-center">{resident.room}</td>
                                <td className="text-center">{resident.firstName}</td>
                                <td className="text-center">{resident.lastName}</td>
                                <td className="text-center">{resident.bornAt}</td>
                                <td className="text-center">{resident.createdAt}</td>
                                <td className="text-center">{resident.updateAt}</td>
                                <td><button
                                    onClick={()=> handleDelete(resident.id)}
                                    className="btn btn-sm btn-info"> modifier</button></td>
                            </tr>)}
                        </tbody>
                    </table>

                    <Pagination currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                length={residents.length}
                                onPageChanged={handlePageChange}/>

                </section>
            </div>


        </>
    )
}