import  axios from 'axios';




const apiGesty = axios.create({
    baseURL: 'https://localhost:8000/api'

});
export default apiGesty;

