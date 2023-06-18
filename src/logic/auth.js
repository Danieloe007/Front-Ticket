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
  },
  isTokenExpired(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    const payload = JSON.parse(jsonPayload);
    const expirationDate = new Date(payload.exp * 1000);
  
    return expirationDate < new Date();
  }
};