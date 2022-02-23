import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import {getUsers} from "../service/UsersService";
import authService from "../service/AuthService";

export default class SignInForm extends Form {
    state = {
        users: [],
        data: {name: ""},
        errors: {}
    }

    schema = {
        name: Joi
            .string()
            .required()
            .label('Name')
    };

    async componentDidMount() {
        const {data: users} = await getUsers();
        this.setState({users});
    }

    render() {
        const { users } = this.state;

        return (
            <React.Fragment>

                <h1>Sign In!</h1>

                <form onSubmit={this.handleSubmit}>
                    {this.renderSelect("name", "Name", users)}
                    <button className={"btn btn-outline-success"}>
                        Login
                    </button>

                </form>

            </React.Fragment>
        );
    }

    doSubmit = async () => {
        const { data, errors } = this.state;
        const { location } = this.props;
        try {
            await authService.login(data.name);
            const { state } = location;

            window.location = state ? state.from.pathname : "/tweets";
        } catch (e) {
            if (e.response && e.response.status === 400) {
                const error = {...errors};
                error.data.name = e.response.data;
                this.setState({errors: error});
            }
        }
    }
}