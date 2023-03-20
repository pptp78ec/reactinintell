import React, {useState} from "react";
import axios from "axios";



function Register({selectedmenu, select, server}) {
    const [user, setUser] = useState(null);

    const submit = e => {
        e.preventDefault();
        axios.post(server + `/register`, user).then(resp => {
            select(null);
        });

    }
    const onChangeHandler = (event: HTMLInputElement) => {
        const {name, value} = event
        setUser((prev) => {
            return {...prev, [name]: value}
        })
    }
    if (selectedmenu === "registermenu") {
        return (
            <>
                <div>
                    <section className="vh-100 bg-image">ц
                        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                            <div className="container h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                        <div className="card" style={{borderRadius: "15px"}}>
                                            <div className="card-body p-5">
                                                <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                                <form onSubmit={submit}>

                                                    <div className="form-outline mb-4">
                                                        <input type="text" id="form3Example1cg"
                                                               className="form-control form-control-lg" name="Name"
                                                               required onChange={(e) => onChangeHandler(e.target)}/>
                                                        <label className="form-label" htmlFor="form3Example1cg">Your
                                                            Name</label>
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <input type="email" id="form3Example3cg"
                                                               className="form-control form-control-lg" name="Email"
                                                               required onChange={(e) => onChangeHandler(e.target)}/>
                                                        <label className="form-label" htmlFor="form3Example3cg">Your
                                                            Email</label>
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <input type="password" id="form3Example4cg"
                                                               className="form-control form-control-lg" name="Password"
                                                               required onChange={(e) => onChangeHandler(e.target)}/>
                                                        <label className="form-label"
                                                               htmlFor="form3Example4cg">Password</label>
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <input type="password" id="form3Example4cdg"
                                                               className="form-control form-control-lg"
                                                               name="ConfirmPassword" required onChange={(e) => onChangeHandler(e.target)}/>
                                                        <label className="form-label" htmlFor="form3Example4cdg">Repeat your
                                                            password</label>
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <input type="text" id="form3Example5cdg"
                                                               className="form-control form-control-lg"
                                                               name="PersonalData" onChange={(e) => onChangeHandler(e.target)}/>
                                                        <label className="form-label" htmlFor="form3Example5cdg">Some info
                                                            about you</label>
                                                    </div>

                                                    <div className="d-flex justify-content-center">
                                                        <button type="submit"
                                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                                                            Register
                                                        </button>
                                                    </div>

                                                    <p className="text-center text-muted mt-5 mb-0">
                                                        Have already an account? <a onClick={()=>select("loginpage")}
                                                                                    className="fw-bold text-body"><u>Login
                                                        here</u></a>
                                                    </p>

                                                </form>

                                            </div>
                                        </div>
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

export default Register;