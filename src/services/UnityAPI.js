import axios from "axios";

function findAll(){
    return axios
        .get("https://127.0.0.1:8000/api/residents")
        .then(response => response.data["hydra:member"]);
}


function deleteUnity(id){
    return axios
        .delete("https://127.0.0.1:8000/api/residents/" + id)
}


export default {
    findAll,
    delete:deleteUnity
}