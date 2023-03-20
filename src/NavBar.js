import React, {useState} from 'react';
import {Cookies, useCookies} from 'react-cookie';
import axios from "axios";



function NavBar({select, setLoggedStatus, loggedstatus, setTransfer, currentuser, config, server}) {
    const [search, setSearch] = useState(null);
    const submit = e => {
        e.preventDefault();
        setTransfer(search);
        select("searchpage")


    }
    const onChangeHandler = (event: HTMLInputElement) => {
        const {value} = event;
        setSearch(value);
    }
    // let [cookies, setCookie, removeCookie] = useCookies(["token"]);
    let token = new Cookies().get("token");
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#" onClick={()=>{select("indexpage")}}>FicSite</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => select("storieslist")} href="#">Stories</a>
                            </li>
                            <li className="navbar-nav me-auto mb-2 mb-lg-0">
                                <a className="nav-link" onClick={() => select("gettop50")} href="#">Top 50 stories</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => select("authorslist")} href="#">Our Authors</a>
                            </li>
                            <li className="nav-item dropdown">
                                <p className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    Menu
                                </p>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {(loggedstatus === false) ? (
                                            <>
                                                <li><a className="dropdown-item" href="#"
                                                       onClick={() => select("loginpage")}>Login</a></li>
                                                <li><a className="dropdown-item" href="#">Register</a></li>
                                            </>)
                                        :
                                        (<>
                                            <li><a className="dropdown-item" onClick={() => {
                                                select("addstorypage")
                                            }} href="#">Add Story</a></li>
                                            <li><a className="dropdown-item" onClick={() => {
                                                setTransfer(currentuser);
                                                select("userprofile")
                                            }} href="#">My profile</a></li>
                                            <li><a className="dropdown-item" onClick={() => {
                                                new Cookies().remove("token");
                                                setLoggedStatus(false)
                                            }} href="#">Logout</a></li>

                                        </>)}
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={submit}>
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search" onChange={ (event) => (onChangeHandler(event.target))}></input>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );

}

export default NavBar;