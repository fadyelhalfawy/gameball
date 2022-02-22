import http from "./HttpService";
import config from "../config/config.json";

export const getClients = () => http.get(config.clientsPath);