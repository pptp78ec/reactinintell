import React, {useEffect, useState} from "react";
import axios from "axios";


function Search({selectedmenu, select, transfer, setTransfer, config, server}) {
    const [sfics, setSFics] = useState(null);
    const [sauths, setSAuths] = useState(null);
    let [authors, setAuthors] = useState(null);
    useEffect(() => {
        if (selectedmenu === "searchpage") {
            axios.get(server + `/SearchUsers/` + transfer, config).then(resp => setSAuths(resp.data));
            axios.get(server + `/SearchFictions/` + transfer, config).then(resp => setSFics(resp.data));
            axios.get(server + '/GetAuthorsAll/', config).then(resp => setAuthors(resp.data));
        }


    }, [selectedmenu])

    if (selectedmenu === "searchpage" && authors!==null) {
        if (sauths !== null || sfics !== null) {
            return (
                <>
                    <div>
                        <div style={{marginTop: "1em"}}><h4>Found authors</h4></div>
                        <div style={{marginTop: "1.5em"}}>
                            <div className="content">
                                <div className="list-group">
                            {
                                sauths.map((el) => (
                                <a onClick={()=>{setTransfer(el); select("userprofile")}}
                                   className="list-group-item list-group-item-action" href="#">{el.name}</a>
                            ))
                            }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{marginTop: "1em"}}><h4>Found stories</h4></div>
                        <div style={{marginTop: "1.5em"}}>
                            {
                                sfics.map(el => (
                                    <div key={el.id} className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseOne" aria-expanded="true"
                                                        aria-controls="collapseOne"
                                                        style={{display: "flex"}}>
                                                    <strong>{(authors.find(x => x.id === el.userId)).name}</strong>
                                                    <span style={{marginLeft: "1em"}}>{el.name}</span>
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show"
                                                 aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body"
                                                     style={{
                                                         display: "flex",
                                                         flexDirection: "column",
                                                         justifyContent: "left"
                                                     }}>
                                                    <span>{el.annotation}</span>
                                                    <a className="btn btn-primary btn-sm"
                                                       style={{marginTop: "1em", alignSelf: "start"}}
                                                       onClick={()=>{setTransfer(el); select('chapterlist');}}>Read</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </>
            );
        } else return (
            <>
                <h3 className="m-auto">Nothing was found!</h3>
            </>
        );
    } else return null;

}

export default Search;