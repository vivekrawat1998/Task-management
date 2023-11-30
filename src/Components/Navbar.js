import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{border: "2px solid black", backgroundColor: "grey"}}>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/add">Add task</Link>
            </li>
            <li>
                <Link to="/list">Show task</Link>
            </li>

        </ul>
    </div>
  );
};

export default Navbar;
