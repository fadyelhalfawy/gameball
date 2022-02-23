import http from "./HttpService";
import config from "../config/config.json";

export const getUsers = () => http.get(config.usersPath);