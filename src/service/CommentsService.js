import http from "./HttpService";
import config from "../config/config.json";

export const getComments = () => http.get(config.commentsPath);

export const getComment = commentId => http.get(config.commentsPath + "/" + commentId);

export function addComment(comment) {
    return http.post(config.commentsPath, {
        comment: comment.comment,
        tweet: {
            tweet: comment.tweet,
            user: {
                name: comment.userTweeted
            }
        },
        userCommenter: {
            name: comment.userCommenter
            }
    })};
