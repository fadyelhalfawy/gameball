import React from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Tweets from "./tweetstable/Tweets";

const App = () => {
    return (
        <React.Fragment>

            <NavBar user={"Fady Halfawy"}/>

            <main className={"container"}>
                <Switch>
                    {/*<Route path={"/sign-in"} component={SignIn}/>*/}
                    {/*<Route path={"/home"} component={Home}/>*/}
                    <Route path={"/tweets"} component={Tweets}/>
                    {/*<Route path={"/about-us"} component={About}/>*/}
                    {/*<Route path={"/notfound"} to={NotFoundForm} />*/}
                    <Redirect from={"/"} exact to={"/tweets"} />
                    <Redirect to={"/notfound"} />
                </Switch>

            </main>

        </React.Fragment>

    );
}

export default App;