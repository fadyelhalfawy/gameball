import {Component} from "react";
import Joi from "joi-browser";
import SearchBoxForm from "../components/SearchBox";
import Pagination from "../components/Pagination";
import {getPageData} from "../helperfunction/GetPageData";
import CommentTable from "../Commenttable/CommentTable";
import {getComments} from "../service/CommentsService";

export default class Comments extends Component{
        state = {
            comments: [],
            searchQuery: "",
            pageSize: 5,
            currentPage: 1,
            sortColumn: {path: "name", order: 'asc'},
            data: {
                tweet: "",
                userTweeted: "",
                comment: "",
                commenter: "",
                date: ""
            },
            errors: {}
        };

        schema = {
            name: Joi.string().label("Writer"),
            tweet: Joi.string().label("Tweet")
        };

        async componentDidMount() {
            const {data: comments} = await getComments();
            this.setState({comments});
        };

        render() {
            const {comments, searchQuery, currentPage, pageSize, sortColumn} = this.state;
            const {length, dataPaginate} = getPageData(comments, pageSize, currentPage, sortColumn, searchQuery, 1);
            return (
                <div>
                    <SearchBoxForm
                        value={searchQuery}
                        onChange={this.handleSearch}
                    />
                    <CommentTable
                        comments={dataPaginate}
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

        handleReply = reply => {
            console.log(reply);
        }
}