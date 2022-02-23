import http from "./HttpService";
import config from "../config/config.json";

export const getReplies = () => http.get(config.repliesPath);

export function addReply(reply) {
    return http.post(config.repliesPath, {
        reply: reply.reply,
        userReplier: {
            _id: reply.replierId,
            name: reply.userReplier
        },
        comment: {
            _id: reply.commentId,
            comment: reply.comment,
            userCommenter: {
                _id: reply.userCommenterId,
                name: reply.userCommenter
            },
            tweet: {
                _id: reply.tweetId,
                tweet: reply.tweet,
                user: {
                    _id: reply.userTweetedId,
                    name: reply.userTweeted
                }
            }
        }
    })};