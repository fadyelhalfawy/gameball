import {Component} from "react";
import authService from "../service/AuthService";

export default class LogOutForm extends Component {

    componentDidMount() {
        authService.logout();
        window.location = "/sign-in";
    }

    render() {
        return null;
    }
};