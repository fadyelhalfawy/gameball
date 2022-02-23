import {Component} from "react";
import SearchBoxForm from "../components/SearchBox";
import Pagination from "../components/Pagination";
import {getPageData} from "../helperfunction/GetPageData";
import RepliesTable from "../repliesTable/RepliesTable";
import {getReplies} from "../service/RepliesService";

export default class Replies extends Component {
    state = {
        replies: [],
        searchQuery: "",
        pageSize: 5,
        currentPage: 1,
        sortColumn: {path: "replier", order: 'asc'},
        data: {
            reply: "",
            userReplier: "",
            tweet: "",
            comment: "",
            date: ""
        },
        errors: {}
    };

    async componentDidMount() {
        const {data: replies} = await getReplies();
        this.setState({replies});
    };

    render() {
        const {replies, searchQuery, currentPage, pageSize, sortColumn} = this.state;
        const {length, dataPaginate} = getPageData(replies, pageSize, currentPage, sortColumn, searchQuery, 2);
        return (
            <div>
                <SearchBoxForm
                    value={searchQuery}
                    onChange={this.handleSearch}
                />
                <RepliesTable
                    replies={dataPaginate}
                    onReply={this.handleReply}
                    onSort={this.handleSort}
                    sortColumn={sortColumn}
                />

                <Pagination
                    pageSize={pageSize}
                    length={length}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </div>
        )
    }

    handlePageChange = page => this.setState({currentPage: page});

    handleSearch = query => this.setState({searchQuery: query, currentPage: 1});

    handleSort = path => {
        const sortColumn = {...this.state.sortColumn};
        if (sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';

        this.setState({sortColumn});
    };

}