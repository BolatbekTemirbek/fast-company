import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <div>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <NavLink
                            className={({ isActive }) =>
                                "nav-link" + (isActive ? " active" : "")
                            }
                            aria-current="page"
                            to={"/"}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className={({ isActive }) =>
                                "nav-link" + (isActive ? " active" : "")
                            }
                            to={"/login"}
                        >
                            Login
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className={({ isActive }) =>
                                "nav-link" + (isActive ? " active" : "")
                            }
                            to={"/users"}
                        >
                            Users
                        </NavLink>
                    </li>
                </ul>
            </div>
            <></>
        </>
    );
};

export default NavBar;
