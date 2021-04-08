import  axios from 'axios';


//todo la requete de default axios ne fonctionne pas ??

const apiGesty = axios.create({
    baseURL: 'https://localhost:8000/api'

});
export default apiGesty;

