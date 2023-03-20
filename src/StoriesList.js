import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { useReducer } from "react";


function StoriesList({ selectedmenu, select, setTransfer, config, server}) {
    let [datast, setDatast] = useState(null);
    let [authors, setAuthors] = useState(null);

    useEffect(() => {
        if (selectedmenu === "storieslist") {
            let apiUrl2 = server + `/GetAuthorsAll/`;
            let apiUrl = server + '/GetFictionAll';

            axios.get(apiUrl, config).then((resp) => {
                setDatast(resp.data);
            });
            axios.get(apiUrl2, config).then((resp) => {
                setAuthors(resp.data);
            });

        }
    }, [selectedmenu])


    if (selectedmenu === 'storieslist' && datast !== null && authors !==null) {
        return (
            <>
                <h3 className="storiesheader">All stories</h3>
                {datast.map((el) => (
                    <>
                        <div key={el.id} className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                                        style={{ display: "flex" }}>
                                        <strong>{(authors.find(x => x.id === el.userId)).name }</strong>
                                        <span style={{ marginLeft: "1em" }}>{el.name}</span>
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body" style={{ display: "flex", flexDirection: "column", justifyContent: "left" }}>
                                        <span>{el.annotation}</span>
                                        <button className="" style={{ marginTop: "1em", alignSelf: "start" }} onClick={() => { setTransfer(el); select('chapterlist');  }}>Read</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </>
        );
    }
    else return null;
}

export default StoriesList;