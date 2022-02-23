import http from "./HttpService";
import config from "../config/config.json";

export const getTweets = () => http.get(config.tweetsPath);

// export function addTweet(tweet) {
//     return http.post(config.tweetsPath,{
//
//     })};