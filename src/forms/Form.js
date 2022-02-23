import React, {Component} from "react";
import InputForm from "./InputForm";
import Joi from "joi-browser";

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate() {
        const options = {abortEarly: false};
        const { error } = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null;

        const errors = {};

        for (let item of error.details) errors[item.path[0]] = item.message;

        return errors;
    }

    validateProperty = ( { name, value } ) => {
        const obj = { [name]: value};
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null
    }

    // handleSubmit = e => {
    //     e.preventDefault();
    //     const errors = this.validate();
    //     this.setState({errors: errors || {} });
    //     if (errors) return;
    //
    //     this.doSubmit();
    // };

    handleChange = ({ currentTarget: target }) => {
        const { data, errors } = this.state;
        const getErrors = { ...errors };
        const errorMessage = this.validateProperty(target);
        if (errorMessage) getErrors[target.name] = errorMessage;
        else delete getErrors[target.name];

        const getData = {...data};
        getData[target.name] = target.value;
        this.setState({ data: getData, errors: getErrors });
    }

    // handleClickButton = (history, path, label) => {
    //     if (path === "/movies") {
    //         const errors = this.validate();
    //         this.setState({errors: errors || {}});
    //         if (errors) return;
    //     }
    //
    //     HandleButtonTransfer(history, path, label);
    // };

    renderFormInput(name, label, placeHolder, type="text") {
        const { data, errors } = this.state;

        return(
            <InputForm
                name={name}
                type={type}
                value={data[name]}
                onChange={this.handleChange}
                label={label}
                placeholder={placeHolder}
                error={errors[name]}
            />
        );
    }
}

export default Form;