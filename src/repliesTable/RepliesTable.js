import {Component} from "react";
import {DisplayTable} from "../table/DisplayTable";

export default class RepliesTable extends Component {
    render() {
        const { replies, onSort, sortColumn } = this.props;

        return(
            <DisplayTable
                data={replies}
                columns={this.columns}
                onSort={onSort}
                sortColumn={sortColumn}
            />
        );
    };

    columns = [
        { path: "tweet.tweet", label: "Tweet"},
        { path: "tweet.user.name", label: "UserTweeted"},
        { path: "comment.comment", label: "Comment"},
        { path: "comment.userCommenter.name", label: "Commenter"},
        { path: "reply", label: "Reply"},
        { path: "userReplier.name", label: "replier"},
        { path: "date", label: "Date"}
    ];
}