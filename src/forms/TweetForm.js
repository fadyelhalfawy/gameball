import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import {addTweet} from "../service/TweetsService";

class TweetForm extends Form {
    state = {
        data: {
            tweet: "",
            userId: "",
            userName: ""
        },
        errors: {}
    }

    schema = {
        tweet: Joi
            .string()
            .max(140)
            .required()
            .label('Tweet'),

        userName: Joi
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
                    {this.renderFormInput("userName", "Name", "Name")}

                    <button className={"btn btn-outline-success"}>
                        Add Tweet
                    </button>
                </form>

            </React.Fragment>
        );
    }

    async populateTweet() {
        const { history, user, userId } = this.props;

        try {
            const mapData = this.mapToViewModel(user, userId);
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
            userName: user
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