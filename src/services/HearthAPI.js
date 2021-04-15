import axios from "axios";

function findAll(){
    return axios
        .get("https://127.0.0.1:8000/api/hearths")
        .then(response => response.data["hydra:member"]);
}


function  postHearth(hearth){
    return axios
        .post("https://localhost:8000/api/hearths", hearth)
        .then(response =>  response.data.id)
}




function deleteHearth(id){
    return axios
        .delete("https://127.0.0.1:8000/api/hearths/" + id)
}


export default {
    findAll,
    postHearth,
    delete:deleteHearth
}