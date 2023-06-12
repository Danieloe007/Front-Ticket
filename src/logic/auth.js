import axios from "axios";
import Cookies from "js-cookie";

const ENDPOINT_PATH = "http://localhost:5107/";

export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  register(email, password) {
    const user = { email, password };
    return axios.post(ENDPOINT_PATH + "regiser", user);
  },
  login(emailUser, passwordUser, idCompany, numTower, numApartament) { 
    const loginData ={ emailUser, passwordUser, idCompany, numTower, numApartament };
    
    return axios({
      method: 'post',
      url: ENDPOINT_PATH + "login",
      data: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  deleteUserLogged() {
    Cookies.remove('userLogged');
  },
  isLoggedIn() {
    return !!Cookies.get("userLogged");  // Devuelve true si hay una cookie "userLogged", de lo contrario devuelve false
  }
};