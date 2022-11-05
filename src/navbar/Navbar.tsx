import React from "react";
import './Navbar.css';
import {Link} from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <div className="nav-bar">
                <Link to="/">Home</Link>
                <Link to="/players">Players</Link>
                <Link to="/charities">Charities</Link>
            </div>
        )
    }
}

export default Navbar;