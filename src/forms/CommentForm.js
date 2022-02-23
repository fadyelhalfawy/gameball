import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import {addComment} from "../service/CommentsService";
import {getTweet} from "../service/TweetsService";

class CommentForm extends Form {
    state = {
        data: {
            tweet: "",
            userTweeted: "",
            comment: "",
            userCommenter: ""
        },
        errors: {}
    }

    schema = {
        tweet: Joi
            .string()
            .required()
            .label('Tweet'),

        userTweeted: Joi
            .string()
            .required()
            .label('UserTweeted'),

        comment: Joi
            .string()
            .required()
            .label('Comment'),

        userCommenter: Joi
            .string()
            .required()
            .label('Commenter')
    };

    async componentDidMount() {
        await this.populateComment();
    }

    render() {
        return (
            <React.Fragment>

                <h1>Comment Form</h1>

                <form>
                    {this.renderFormInput("tweet", "Tweet", 'Tweet')}
                    {this.renderFormInput("userTweeted", "UserTweeted", "UserTweeted")}
                    {this.renderFormInput("comment", "Comment", "Comment")}
                    {this.renderFormInput("userCommenter", "Commenter", "Commenter")}

                    <button className={"btn btn-outline-info"} onClick={this.doSubmit}>
                        Comment
                    </button>
                </form>

            </React.Fragment>
        );
    }

    async populateComment() {
        const { history, match, user } = this.props;

        try {
            const commentId = match.params.id;
            const tweetId = match.params.tweetId;


            if (commentId === "new") {
                const {data: tweet} = await getTweet(tweetId);
                const mapData = this.mapToViewModel(tweet, user.name);
                this.setState({ data: mapData });
            }
            else return;
        }
        catch (e) {
            if (e.response && e.response.status === 404)
                history.replace("/notfound");
        }
    };

    mapToViewModel(comment, user) {
        return {
            tweet: comment.tweet,
            userTweeted: comment.user.name,
            comment: "",
            userCommenter: user
        };
    }

    doSubmit = async e => {
        const { data } = this.state;
        const { history } = this.props;
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {} });
        if (errors) return;
        await addComment(data);
        return history.replace("/comments");
    };
}
export default CommentForm;