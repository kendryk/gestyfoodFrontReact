import axios from "axios";

function findAll(id,residents){
    return axios
        .get("https://127.0.0.1:8000/api/unities/"+id+"/residents/"+residents+"/day_checks")
        .then(response => response.data["hydra:member"]);
}


function deleteDayChecks(id){
    return axios
        .delete("https://127.0.0.1:8000/api/day_checks/" + id)
}


export default {
    findAll,
    delete:deleteDayChecks
}