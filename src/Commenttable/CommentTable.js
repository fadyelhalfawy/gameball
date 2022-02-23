import {Component} from "react";
import {DisplayTable} from "../table/DisplayTable";

export default class CommentTable extends Component {
    render() {
        const { comments, onSort, sortColumn } = this.props;

        return(
            <DisplayTable
                data={comments}
                columns={this.columns}
                onSort={onSort}
                sortColumn={sortColumn}
            />
        );
    };

    columns = [
        { path: "tweet.tweet", label: "Tweet"},
        { path: "tweet.user.name", label: "UserTweeted"},
        { path: "comment", label: "Comment"},
        { path: "userCommenter.name", label: "Commenter"},
        { path: "date", label: "Date"},
        { key: "reply",
            content: reply => (
                <button
                    className="btn btn-outline-info btn-sm"
                    onClick={() => this.props.onReply(reply)}
                >
                    Reply
                </button>
            )
        }
    ];
}