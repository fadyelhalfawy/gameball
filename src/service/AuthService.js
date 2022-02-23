import http from "./HttpService";
import config from "../config/config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

http.setJwt(getJwt());

async function login(name) {
    const { data: jwt } = await http.post(config.authPath, { name });
    localStorage.setItem(tokenKey, jwt);
}

function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    }
    catch (e) {
        return null;
    }
}

function getJwt() {
    return localStorage.getItem(tokenKey);
}

function logout() {
    localStorage.removeItem(tokenKey);
}

const authService = {
    login,
    getCurrentUser,
    logout
}

export default authService;