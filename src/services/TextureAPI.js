import axios from "axios";

function findAll(){
    return axios
        .get("https://127.0.0.1:8000/api/textures")
        .then(response => response.data["hydra:member"]);
}




function deleteTexture(id){
    return axios
        .delete("https://127.0.0.1:8000/api/textures/" + id)
}


export default {
    findAll,
    delete:deleteTexture
}