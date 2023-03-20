import React, {useState} from "react";
import axios from "axios";
import {Cookies} from "react-cookie";
import jwtDecode from "jwt-decode";
import CurrentUser from "./CurrentUser";


function Login({select, selectedmenu, setloggedStatus, setCurrentUser, server}) {
    const [user, setUser] = useState(null);

    const submit = e => {
        e.preventDefault();
        axios.post(server + `/login`, user).then(resp => {
            let token = resp.data.token;
            let jwt = jwtDecode(token);
            console.log(jwt);
            let id = jwt.id;
            axios.get(server + `/GetAuthor/` + id).then(resp => {
                let user = resp.data;
                let currentusr = new CurrentUser(user.id, user.name, user.email, user.password, user.personalData);
                console.log(currentusr);
                setCurrentUser(currentusr);
            })
            new Cookies().set("token", token);
            setloggedStatus(true);
            select(null);
        });

    }
    const onChangeHandler = (event: HTMLInputElement) => {
        const {name, value} = event
        setUser((prev) => {
            return {...prev, [name]: value}
        })
    }
    if (selectedmenu === "loginpage") {
        return (
            <>
                <div>
                    <section className=" text-center text-lg-start">
                        <div className="card mb-3">
                            <div className="row g-0 d-flex align-items-center">
                                <div className="col-lg-4 d-none d-lg-flex">
                                    <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                                         alt="Trendy Pants and Shoes"
                                         className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"/>
                                </div>
                                <div className="col-lg-8">
                                    <div className="card-body py-5 px-md-5">

                                        <form onSubmit={submit}>
                                            <div className="form-outline mb-4">
                                                <input type="email" id="form2Example1" className="form-control"
                                                       name="Email" onChange={(e) => onChangeHandler(e.target)}/>
                                                <label className="form-label" htmlFor="form2Example1">Email
                                                    address</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="form2Example2" className="form-control"
                                                       name="Password" onChange={(e) => onChangeHandler(e.target)}/>
                                                <label className="form-label" htmlFor="form2Example2">Password</label>
                                            </div>

                                            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </>
        );
    } else return null;
}

export default Login;