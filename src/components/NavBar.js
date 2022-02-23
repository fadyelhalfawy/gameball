import React from "react";
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";

const NavBar = ({ user }) => {

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand container" to="/">Twitter...</Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/tweets">
                        Tweets
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/comments">
                        Comments
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/replies">
                        Replies
                    </NavLink>
                </div>


            </div>
            <div className="navbar-nav">
                {!user && (
                    <NavLink className="nav-item nav-link" to="/sign-in">
                        Login
                    </NavLink>
                )
                }

                {user && (
                    <React.Fragment>
                        <NavLink className="nav-item nav-link" to="/profile">
                            {user.name}
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/logout">
                            Logout
                        </NavLink>
                    </React.Fragment>
                )
                }
            </div>

        </nav>
    );
}

export default NavBar;