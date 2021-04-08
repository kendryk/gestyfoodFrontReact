import axios from "axios";

function findAll(){
    return axios
        .get("https://127.0.0.1:8000/api/unities")
        .then(response => response.data["hydra:member"]);
}


function deleteUnities(id){
    return axios
        .delete("https://127.0.0.1:8000/api/unities/" + id)
}


export default {
    findAll,
    delete:deleteUnities
}