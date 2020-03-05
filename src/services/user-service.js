import axios from "../plugins/axios";
function getTotalLoan(){
   return axios.get("/finacials");
}

function getUserList(){

    return axios.get("/users");
}

function getUserByName(name){
  return axios.get(`users/${name}`)
}


export default {
  getTotalLoan,
  getUserList,
  getUserByName
};