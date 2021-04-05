import axios from "axios";

function findAll(){
    return axios
        .get("https://127.0.0.1:8000/api/diets")
        .then(response => response.data["hydra:member"]);
}


function deleteDiet(id){
    return axios
        .delete("https://127.0.0.1:8000/api/diets/" + id)
}


export default {
    findAll,
    delete:deleteDiet
}