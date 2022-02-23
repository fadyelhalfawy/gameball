import {Component} from "react";
import {DisplayTable} from "../table/DisplayTable";

export default class TweetsTable extends Component {
    render() {
        const { tweets, onSort, sortColumn } = this.props;

        return(
            <DisplayTable
                data={tweets}
                columns={this.columns}
                onSort={onSort}
                sortColumn={sortColumn}
            />
        );
    };

    columns = [
        { path: "user.name", label: "Name"},
        { path: "tweet", label: "Tweet"},
        { path: "date", label: "Date"},
        { key: "Comment",
            content: tweet => (
                <button
                    className="btn btn-outline-info btn-sm"
                    onClick={() => this.props.onComment(tweet)}
                >
                    Comment
                </button>
            )
        }
    ];
}