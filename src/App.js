import React from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Tweets from "./tweetstable/Tweets";
import Comments from "./routers/Comments";
import {Replies} from "./routers/Replys";
import {NotFound} from "./routers/NotFound";
import CommentForm from "./forms/CommentForm";

const App = () => {
    return (
        <React.Fragment>

            <NavBar user={"Fady Halfawy"}/>

            <main className={"container"}>
                <Switch>
                    {/*<Route path={"/sign-in"} component={SignIn}/>*/}
                    {/*<Route path={"/home"} component={Home}/>*/}
                    <Route path={"/tweets"} component={Tweets}/>
                    <Route path={"/comments/:id/:tweetId"} render={props => <CommentForm user={"Fady"} {...props}/>}/>
                    <Route path={"/comments"} component={Comments}/>
                    <Route path={"/replies"} component={Replies}/>
                    {/*<Route path={"/about-us"} component={About}/>*/}
                    <Route path={"/notfound"} to={NotFound} />
                    <Redirect from={"/"} exact to={"/tweets"} />
                    <Redirect to={"/notfound"} />
                </Switch>

            </main>

        </React.Fragment>

    );
}

export default App;