import React, {useContext, useEffect, useState} from 'react';
import Aside from "../../components/layouts/Aside";
import {Link} from "react-router-dom";
import AuthAPI from "../../services/AuthAPI";
import RegimeAPI from "../../services/RegimeAPI";
import TextureAPI from "../../services/TextureAPI";
import TableLoader from "../../components/loaders/TableLoader";
import AuthContext from "../../contexts/AuthContext";
import {toast} from "react-toastify";
export default function RegimePage({history}){

    const {setIsAuthenticated} = useContext(AuthContext)


    const  handleLogout = ()=> {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté ")
        history.push("/login")
    }




    const  [userIdentified, setUserIdentified] = useState("");
    const [regimes, setRegimes] = useState([]);
    const [textures, setTextures] = useState([]);
    const [loading,setLoading] = useState(true);



    /**
     * Récupere les Régime aupres de l'API
     */
    const fetchRegime = async () => {
        try{
            const data = await RegimeAPI.findAll();
            setRegimes(data);
            setLoading(false);
        }catch(error){
            console.log(error.response)
        }
    };

    /**
     * Récupere les Régime aupres de l'API
     */
    const fetchTexture = async () => {
        try{
            const data = await TextureAPI.findAll();
            setTextures(data);
            setLoading(false);
        }catch(error){
            console.log(error.response)
            handleLogout()
        }
    };


    /**
     * Charger les texture /regime au chargement de la page.
     */
    useEffect(() => {
        document.title = "Gestion Food";
        NameIndentified();
        fetchRegime().then();
        fetchTexture().then();
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



    return(
    <>

        <div className="d-flex">
            <Aside/>
            <div className="p-4 section_home bg_white bdr-bs">

                {!userIdentified ? ['Aucun utilisateur'] :
                    <div>
                        <strong>
                            <p>  {`${userIdentified.firstName}  ${userIdentified.lastName} vous êtes au foyer ${userIdentified.hearthName}`}</p>
                        </strong>
                    </div>}
                <div className="unities_top">
                    <div>
                        <h1>Liste des régimes et textures </h1>
                        <p>Ici vous  visualiser  la liste des régimes et la liste des textures (nature) </p>
                    </div>
                </div>

                <section className='d-flex '>

                    <article className='m-2'>
                        <div className="unities_top_button mb-5">
                            <Link to="/regime/new" className="btn btn-gold">Nouveaux regime</Link>
                        </div>





                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th className="text-center"> Regime</th>
                                <th className="text-center"/>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>

                            {regimes.map(regime =>
                                <tr key={regime.id}className="vertical-text-center">
                                    <td className="text-center">{regime.name}</td>
                                    <td><Link to={`/regime/`+regime.id} className=" m-1 btn btn-info">Modifier</Link></td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        {loading &&<TableLoader/>}





                    </article>



                    <article className='m-2'>
                        <div className="unities_top_button  mb-5">
                            <Link to="/texture/new" className="btn btn-gold">Nouvelle Texture</Link>
                        </div>


                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th className="text-center">Texture</th>
                            <th className="text-center"/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {loading && (
                            <tr>
                                <td>Chargement .....</td>
                            </tr>
                        )}
                        {textures.map(texture =>
                        <tr key={texture.id} className="vertical-text-center">
                            <td className="text-center">{texture.name}</td>
                            <td><Link to={`/texture/`+texture.id} className=" m-1 btn btn-info">Modifier texture</Link></td>
                        </tr>
                        )}
                        </tbody>
                    </table>



                </article>




                </section>












            </div>







        </div>
    </>
    )
}