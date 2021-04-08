import axios from 'axios';
import jwtDecode from "jwt-decode";
import apiGesty from "../conf/axios-conf";

/**
 * Déconnection (suppression du token local storage)
 */
function logout(){
    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('id')
    window.localStorage.removeItem('name')
    delete axios.defaults.headers['Authorization']
}

/**
 * Requete HTTP d'authenfication et stockage du token dans le storage et sur axios
 * @param credentials
 * @returns {Promise<void>}
 */
function authenticate(credentials){

    return apiGesty
        .post('/login_check', credentials)
        .then(response=> response.data.token)
        .then(token => {

            // je stocke mon token dans mon localstorage
            window.localStorage.setItem('authToken', token);

            // On previent axios qu'on a maintenant un header par default sur toutes nos futurs requetes HTTP
            setAxiosToken(token);
        });
}

/**
 * Positionne le token JWT sur Axios
 * @param token
 */
function setAxiosToken(token){
    axios.defaults.headers['Authorization'] = 'Bearer ' + token;
}

/**
 * mise en place lors du chargement de l'application
 */
function setup(){
    //1. apperçoit-on  le token?
    const token = window.localStorage.getItem('authToken');
    //2. si le token est encore valide au niveau de la date expiration
    if (token){
        const jwtData = jwtDecode(token);
        if((jwtData.exp * 1000) > new Date().getTime){
    //3 Donner le token à axios.
            setAxiosToken(token);
            }else{
            logout();
        }
        }else{
        logout();
    }
}

/**
 * permettre de savoir si on peut savoir si on est identifier ou non
 * @returns {boolean}
 */
function isAuthenticated() {
    //1. apperçoit-on  le token?
    const token = window.localStorage.getItem('authToken');
    //2. si le token est encore valide au niveau de la date expiration
    if (token) {
        const jwtData = jwtDecode(token)
        return(jwtData.exp * 1000) > new Date().getTime;
    }
    return false;
}

/**
 * permettre connaitre l'indentité de la personne
 * @returns {boolean|unknown}
 */
function isAuthenticatedName() {
    //1. apperçoit-on  le token?
    const token = window.localStorage.getItem('authToken');
    //2. si le token est encore valide au niveau de la date expiration
    if (token) {
        const jwtData = jwtDecode(token)
        return jwtData;
    }
    return false;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default{
    authenticate,
    logout,
    setup,
    isAuthenticated,
    isAuthenticatedName
};
