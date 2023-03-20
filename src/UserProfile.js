import React, {useEffect, useState} from "react";
import axios from "axios";


function UserProfile({selectedmenu, select, setTransfer, transfer, loggedstatus, currentuser, config, server}) {
    const isloggedopts = function (status, transfer) {
        if (status === true && currentuser.id === transfer.id) {
            return (
                <>
                    {
                        <div style={{margin: "1em auto 1em auto"}}>
                            <a className="btn btn-primary btn-sm" style={{marginTop: "1em", alignSelf: "start"}}
                               onClick={() => {
                                   setTransfer(transfer);
                                   select("editprofilepage");
                               }} href="#">Edit</a>
                        </div>
                    }
                </>
            );
        } else return null;
    }
    const [author, setAuthor] = useState(null);
    const [authworks, setAuthworks] = useState(null);
    useEffect(() => {
        if (selectedmenu === "userprofile") {
            setAuthor(transfer);
            axios.get(server + '/GetFictionAuthor/' + transfer.id, config).then(
                resp => setAuthworks(resp.data)
            )
            if (authworks === null) {
                setAuthworks([]);
            }
        }
    }, [selectedmenu])
    if (selectedmenu === "userprofile" && authworks !== null) {
        return (
            <>
                <div>
                    <section className="section about-section gray-bg" id="about">
                        <div className="container">
                            <div className="row align-items-center flex-row-reverse">
                                <div className="col-lg-6">
                                    <div className="about-text go-to">
                                        <h3 className="dark-color">About {author.name}</h3>
                                        <p>{author.personalData}</p>
                                        {isloggedopts(loggedstatus, transfer)}
                                        <div className="row about-list">
                                            <div className="col-md-6">
                                                <div className="media">
                                                    <label>E-mail</label>
                                                    <p>{author.email}l</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="about-avatar">
                                        <img src="/Images/avatar.png" title="" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="storiespart" style={{marginTop: "5%"}}>
                                <div><h4>Stories by {author.name}</h4></div>
                                <div className="fiction-list">
                                    {
                                        authworks.map((item) => (
                                            <div key={item.id} className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingOne">
                                                        <button className="accordion-button" type="button"
                                                                data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                                                aria-expanded="true" aria-controls="collapseOne"
                                                                style={{display: "flex"}}>
                                                            <span style={{marginLeft: "1em"}}>{item.name}</span>
                                                        </button>
                                                    </h2>
                                                    <div id="collapseOne" className="accordion-collapse collapse show"
                                                         aria-labelledby="headingOne"
                                                         data-bs-parent="#accordionExample">
                                                        <div className="accordion-body"
                                                             style={{
                                                                 display: "flex",
                                                                 flexDirection: "column",
                                                                 justifyContent: "left"
                                                             }}>
                                                            <span>{item.annotation}</span>
                                                            <a className="btn btn-primary btn-sm"
                                                               style={{marginTop: "1em", alignSelf: "start"}}
                                                               onClick={() => {
                                                                   setTransfer(item);
                                                                   select("chapterlist")
                                                               }}>Read</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        );
    } else return null;
}

export default UserProfile;