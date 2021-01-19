import axios from "../request/http";
import base from "./base";
// let bd = base.bd
const api = {
  
  login(params) {
    return axios.post(`/service/user/login`, params);
  },
  
};
export default api;
