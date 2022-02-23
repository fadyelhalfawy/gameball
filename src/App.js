import React, {Component} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Tweets from "./routers/Tweets";
import Comments from "./routers/Comments";
import {NotFound} from "./routers/NotFound";
import CommentForm from "./forms/CommentForm";
import TweetForm from "./forms/TweetForm";
import SignInForm from "./forms/SignInForm";
import authService from "./service/AuthService";
import LogOutForm from "./forms/LogOutForm";
import ReplyForm from "./forms/ReplyForm";
import Replies from "./routers/Replies";

class App extends Component {

    state = {user: ""}

    componentDidMount() {
        const user = authService.getCurrentUser();
        if (!user) this.setState({user: ""})
        this.setState({ user });
    }

    render() {
        const { user } = this.state;

        return (
            <React.Fragment>

                <NavBar user={user}/>

                <main className={"container"}>
                    <Switch>
                        <Route path={"/sign-in"} component={SignInForm}/>
                        <Route path={"/tweets/:id"} render={props => <TweetForm user={user} {...props}/>}/>
                        <Route path={"/tweets"} component={Tweets}/>
                        <Route path={"/comments/:id/:tweetId"} render={props => <CommentForm user={user} {...props}/>}/>
                        <Route path={"/comments"} component={Comments}/>
                        <Route path={"/replies/:id/:tweetId/:commentId"} render={props => <ReplyForm user={user} {...props} />}/>
                        <Route path={"/replies"} component={Replies}/>
                        <Route path={"/logout"} component={LogOutForm}/>
                        <Route path={"/notfound"} to={NotFound} />
                        <Redirect from={"/"} exact to={"/sign-in"} />
                        <Redirect to={"/notfound"} />
                    </Switch>

                </main>

            </React.Fragment>

        );
    }

}

export default App;