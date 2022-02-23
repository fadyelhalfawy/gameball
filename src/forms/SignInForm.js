import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import {getUsers} from "../service/UsersService";

export default class SignInForm extends Form {
    state = {
        users: [],
        data: {userName: ""},
        errors: {}
    }

    schema = {
        userName: Joi
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
                    {this.renderSelect("userName", "Name", users)}
                    <button className={"btn btn-outline-success"}>
                        Login
                    </button>

                </form>

            </React.Fragment>
        );
    }

    doSubmit = () => {
        const {errors } = this.state;
        const { history } = this.props;
        try {
            history.push("/tweets");
        } catch (e) {
            if (e.response && e.response.status === 400) {
                const error = {...errors};
                error.data = e.response.data;
                this.setState({errors: error});
            }
        }
    }
}