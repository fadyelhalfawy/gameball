import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import {addTweet} from "../service/TweetsService";

class TweetForm extends Form {
    state = {
        data: {
            tweet: "",
            userId: "",
            name: ""
        },
        errors: {}
    }

    schema = {
        tweet: Joi
            .string()
            .max(140)
            .required()
            .label('Tweet'),

        name: Joi
            .string()
            .required()
            .label('UserName')
    };

    async componentDidMount() {
        await this.populateTweet();
    }

    render() {
        return (
            <React.Fragment>

                <h1>Tweet Form</h1>

                <form onSubmit={this.handleSubmit}>
                    {this.renderFormInput("tweet", "Tweet", 'Tweet')}
                    {this.renderFormInput("name", "Name", "Name")}

                    <button className={"btn btn-outline-success"}>
                        Add Tweet
                    </button>
                </form>

            </React.Fragment>
        );
    }

    async populateTweet() {
        const { history, user } = this.props;

        try {
            const mapData = this.mapToViewModel(user.name, user._id);
            this.setState({ data: mapData });
        }
        catch (e) {
            if (e.response && e.response.status === 404)
                history.replace("/notfound");
        }
    };

    mapToViewModel(user, userId) {
        return {
            tweet: "",
            userId: userId,
            name: user
        };
    }

    doSubmit = async () => {
        const { data } = this.state;
        const { history } = this.props;

        await addTweet(data);
        return history.replace("/tweets");
    };
}
export default TweetForm;