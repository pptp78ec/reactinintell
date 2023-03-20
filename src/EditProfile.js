import React, {useState} from "react";
import axios from "axios";

function EditProfile({selectedmenu, select, transfer, currentuser, server}) {

    let [editedProfile, editProfile] = useState(null);

    const submit = e => {
        e.preventDefault();
        axios.post(server + `/EditUser`, editedProfile).then(resp => {
            select(null);
        });

    }
    const onChangeHandler = (event: HTMLInputElement) => {
        const {name, value} = event
        // editProfile((prev) => {
        //     return {...prev, [name]: value}
        // })
        editedProfile[name]=value;
    }

    if (selectedmenu === "editprofilepage") {
        editedProfile = {
            Id: currentuser.id,
            Name : currentuser.name,
            Email: currentuser.email,
            Password: currentuser.password,
            PersonalData: currentuser.personaldata
        }
        return (
            <>
                <div>
                    <section className="vh-100 bg-image">
                        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                            <div className="container h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                        <div className="card" style={{borderRadius: "15px"}}>
                                            <div className="card-body p-5">
                                                <h2 className="text-uppercase text-center mb-5">Edit profile</h2>
                                                <form onSubmit={submit}>
                                                    <input type="text" className="hidden"
                                                           name="newId" required
                                                           defaultValue={editedProfile.Id}
                                                           onChange={(e) => onChangeHandler(e.target)}/>
                                                    <div className="form-outline mb-4">
                                                        <input type="text" id="form3Example1cg"
                                                               className="form-control form-control-lg" name="Name"
                                                               required
                                                               defaultValue={editedProfile.Name}
                                                               onChange={(e) => onChangeHandler(e.target)}/>
                                                        <label className="form-label" htmlFor="form3Example1cg">Your
                                                            Name</label>
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <input type="email" id="form3Example3cg"
                                                               className="form-control form-control-lg" name="Email"
                                                               required
                                                               defaultValue={editedProfile.Email}
                                                               onChange={(e) => onChangeHandler(e.target)}/>
                                                        <label className="form-label" htmlFor="form3Example3cg">Your
                                                            Email</label>
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <input type="password" id="form3Example4cg"
                                                               className="form-control form-control-lg" name="Password"
                                                               required
                                                               defaultValue={editedProfile.Password}
                                                               onChange={(e) => onChangeHandler(e.target)}/>
                                                        <label className="form-label"
                                                               for="form3Example4cg">Password</label>
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <input type="password" id="form3Example4cdg"
                                                               className="form-control form-control-lg"
                                                               name="ConfirmPassword"
                                                               required defaultValue={editedProfile.Password}
                                                               onChange={(e) => onChangeHandler(e.target)}/>
                                                        <label className="form-label" htmlFor="form3Example4cdg">Repeat your
                                                            password</label>
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <input type="text" id="form3Example5cdg"
                                                               className="form-control form-control-lg"
                                                               name="PersonalData"
                                                               defaultValue={editedProfile.PersonalData}
                                                               onChange={(e) => onChangeHandler(e.target)}/>
                                                        <label className="form-label" htmlFor="form3Example5cdg">Some info
                                                            about
                                                            you</label>
                                                    </div>

                                                    <div className="d-flex justify-content-center">
                                                        <button type="submit"
                                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                                                            Save
                                                        </button>
                                                    </div>

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
        )
            ;

    } else return null;
}

export default EditProfile;