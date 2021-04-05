import axios from "axios";

function findAll(){
    return axios
        .get("https://127.0.0.1:8000/api/users")
        .then(response => response.data["hydra:member"]);
}


function deleteUsers(id){
    return axios
        .delete("https://127.0.0.1:8000/api/users/" + id)
}


export default {
    findAll,
    delete:deleteUsers
}