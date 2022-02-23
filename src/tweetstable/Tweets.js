import {Component} from "react";
import TweetsTable from "./TweetsTable";
import SearchBoxForm from "../components/SearchBox";
import Pagination from "../components/Pagination";
import {getPageData} from "../helperfunction/GetPageData";
import {getTweets} from "../service/TweetsService";

export default class Tweets extends Component {
    state = {
        tweets: [],
        searchQuery: "",
        pageSize: 5,
        currentPage: 1,
        sortColumn: {path: "user.name", order: 'asc'},
        data: {
            name: "",
            tweet: "",
            date: ""
        },
        errors: {}
    };

    async componentDidMount() {
        const {data: tweets} = await getTweets();
        this.setState({tweets});
    };

    render() {
        const {tweets, searchQuery, currentPage, pageSize, sortColumn} = this.state;
        const {length, dataPaginate} = getPageData(tweets, pageSize, currentPage, sortColumn, searchQuery, 0);
        return (
            <div>
                <SearchBoxForm
                    value={searchQuery}
                    onChange={this.handleSearch}
                />
                <TweetsTable
                    tweets={dataPaginate}
                    onComment={this.handleComment}
                    onSort={this.handleSort}
                    sortColumn={sortColumn}
                />

                <Pagination
                    pageSize={pageSize}
                    length={length}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />

                <button
                    className={"btn btn-outline-success"}
                    onClick={this.handleAddTweet}
                >
                    New Tweet
                </button>
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

    handleComment = tweet => {
        const { tweets } = this.state;
        const { history } = this.props;
        const tweetsFilter = tweets.filter(t => t._id === tweet._id);
        const getTweetId = tweetsFilter[0]._id;

        history.push("/comments/new/" + getTweetId);
    }

    handleAddTweet = () => {
        const { history } = this.props;
        history.push('/tweets/new');
    }
    
}