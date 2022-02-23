import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import {addReply} from "../service/RepliesService";
import {getTweet} from "../service/TweetsService";
import {getComment} from "../service/CommentsService";

export default class ReplyForm extends Form {
    state = {
        data: {
            tweetId: "",
            tweet: "",
            userTweeted: "",
            userTweetedId: "",
            commentId: "",
            comment: "",
            userCommenter: "",
            userCommenterId: "",
            replierId: "",
            reply: "",
            userReplier: ""
        },
        errors: {}
    }

    schema = {
        tweetId: Joi.string(),
        userTweetedId: Joi.string(),
        commentId: Joi.string(),
        userCommenterId: Joi.string(),
        replierId: Joi.string(),

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
            .label('Commenter'),
        reply: Joi
            .string()
            .required()
            .label('Reply'),
        userReplier: Joi
            .string()
            .required()
            .label('Replier')
    };

    async componentDidMount() {
        await this.populateReply();
    }

    render() {
        return (
            <React.Fragment>

                <h1>Reply Form</h1>

                <form onSubmit={this.handleSubmit}>
                    {this.renderFormInput("tweet", "Tweet", 'Tweet')}
                    {this.renderFormInput("userTweeted", "UserTweeted", "UserTweeted")}
                    {this.renderFormInput("comment", "Comment", "Comment")}
                    {this.renderFormInput("userCommenter", "Commenter", "Commenter")}
                    {this.renderFormInput("reply", "Reply", "Reply")}
                    {this.renderFormInput("userReplier", "Replier", "Replier")}

                    <button className={"btn btn-outline-info"}>
                        Reply
                    </button>
                </form>

            </React.Fragment>
        );
    }

    async populateReply() {
        const { history, match, user } = this.props;

        try {
            const replyId = match.params.id;
            const tweetId = match.params.tweetId;
            const commentId = match.params.commentId;

            if (replyId === "new") {
                const {data: tweet} = await getTweet(tweetId);


                const {data: comment} = await getComment(commentId);

                const mapData = this.mapToViewModel(tweet, comment, user);
                this.setState({ data: mapData });
            }
            else return;
        }
        catch (e) {
            if (e.response && e.response.status === 404)
                history.replace("/notfound");
        }
    };

    mapToViewModel(tweet, comment, user) {
        return {
            tweetId: tweet._id,
            tweet: tweet.tweet,
            userTweetedId: tweet.user._id,
            userTweeted: tweet.user.name,
            commentId: comment._id,
            comment: comment.comment,
            userCommenter: comment.user.name,
            userCommenterId: comment.user._id,
            reply: "",
            userReplier: user.name,
            replierId: user._id
        };
    }

    doSubmit = async () => {
        const { data } = this.state;
        const { history } = this.props;

        await addReply(data);
        return history.replace("/replies");
    };
}