import React, {useContext, useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import {Link} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";
import UsersAPi from "../../services/UsersAPi";
import moment from "moment";
import Pagination from "../../components/layouts/Pagination";
import TableLoader from "../../components/loaders/TableLoader";
import AuthContext from "../../contexts/AuthContext";
import {toast} from "react-toastify";

export default function UserPage({history}){

    const {setIsAuthenticated} = useContext(AuthContext)


    const  handleLogout = ()=> {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté ")
        history.push("/login")
    }


    const  [userIdentified, setUserIdentified] = useState("");

    const [users, setUsers] = useState([]);

    const [currentPage, setCurrentPage]= useState(1);
    const [loading,setLoading] = useState(true);
    const[search,setSearch] = useState("");

    /**
     * connaitre le nombre d'element par page.
     */
    const itemsPerPage = 5;

    /**
     * Récupere les unités
     * @returns {Promise<void>}
     */
    const fetchUsers = async () => {
        try{
            const data = await UsersAPi.findAll()
            setUsers(data)
            setLoading(false)
        }catch(error){
            console.log(error.response)
            handleLogout()
        }
    };

    /**
     * affichage sur onglet et appel function iddentification
     */
    useEffect(() => {
        document.title = "Préférence";
        NameIndentified();
        fetchUsers();
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
    const filterUsers = users.filter(
        r =>
            r.firstName.toLowerCase().includes(search.toLowerCase()) ||
            r.lastName.toLowerCase().includes(search.toLowerCase())||
            r.work.toLowerCase().includes(search.toLowerCase())
    );

    /**
     * pagination des données
     */
    const paginationUsers = Pagination.getData(
        filterUsers,
        currentPage,
        itemsPerPage);



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

                <section className="unities_top">
                    <div>

                        <h2>Ici vous pouvez gérer les autorisations de vos collaborateurs. </h2>
                        <h3>Tous nouveaux Collaborateur pourra avoir un accès  de lecture au site.</h3>
                    </div>
                    <div className="unities_top_button">
                        <Link to="/user/new" className="btn btn-gold">Nouvel Utilisateur</Link>
                    </div>

                </section>

                <section>
                    <article>
                        <div>
                            <img src="" alt=""/>
                        </div>
                        <p> <strong>Accès Directeur :</strong>   Ceci autorise la lecture,  la création, la modification, suppression d'une fiche résident <br/>
                            et d'une unité, ainsi que  la modification des régimes / nature du résident. <br/>
                            De plus, il a accès à la  suppression du compte (attention ceci supprimera toutes les données).</p>
                    </article>
                    <article>
                        <div>
                            <img src="" alt=""/>
                        </div>
                        <p> <strong>Accès Modérateur :</strong> Ceci autorise la lecture,  la création, la modification, suppression d'une fiche résident <br/>
                        et d'une unité, ainsi que  la modification des régimes / nature du résident..</p>
                    </article>
                    <article>
                        <div>
                            <img src="" alt=""/>
                        </div>
                        <p><strong>Accès Editeur :</strong>Ceci autorise la lecture, la modification des régimes / nature du résident sur la page "gestion  repas".
                        </p>
                    </article>
                </section>


                        {/*List des user */}
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

                        <th className="text-center">Nom</th>
                        <th className="text-center">Prénom</th>
                        <th className="text-center">Poste</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Date de Création  </th>
                        <th className="text-center">Date de modification</th>
                        <th/>
                    </tr>
                    </thead>
                    {!loading && <tbody>

                    {paginationUsers.map(user =>
                        <tr key={user.id} className="vertical-text-center">
                            <td className="text-center">{user.firstName}</td>
                            <td className="text-center">{user.lastName}</td>
                            <td className="text-center">{user.work}</td>
                            <td className="text-center">{user.email}</td>
                            <td className="text-center">{formatDate(user.createdAt)}</td>
                            <td className="text-center">{formatDate(user.updateAt)}</td>

                            <Link to={`/user/${user.id}`} className=" m-1 btn btn-info">Modifier</Link>


                        </tr>)}
                    </tbody>}
                </table>
                {loading &&<TableLoader/>}


                {itemsPerPage < filterUsers.length &&
                (
                    <Pagination currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                length={filterUsers.length}
                                onPageChanged={handlePageChange}/>
                )}


            </section>







        </div>
    </>

)
}