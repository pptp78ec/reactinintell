import React, {useEffect, useState} from "react";
import axios from "axios";
import {forEach} from "react-bootstrap/ElementChildren";

function Top50Stories({selectedmenu, select, setTransfer, page, setPage, config, server}) {
    const intemspage = 20;
    const [datast, setDatast] = useState(null);
    const [authors, setAuthors] = useState(null);
    const [pagestotal, setPagesTotal] = useState(null);
    useEffect(() => {
        if (selectedmenu === "gettop50") {
            axios.get(server + `/GetAuthorsAll/`, config).then(resp => setAuthors(resp.data));
            axios.get(server + `/GetTop50/` + ((page === null || page === undefined) ? (1) : (page)) + "/" + intemspage, config).then(resp => {
                let itemscount = resp.headers.get("itemscount");
                setDatast(resp.data)
                let pagecount = Math.ceil(Number(itemscount) / intemspage);
                let pagearr = [];
                for (let i = 1; i <= pagecount; i++) {
                    pagearr.push(i);
                }
                setPagesTotal(pagearr);
            })
        }
    }, [selectedmenu, page]);
    if (selectedmenu === "gettop50" && authors !== null && datast !== null && pagestotal !== null && pagestotal !== null) {
        return (
            <>
                <h3 className="storiesheader">All stories</h3>
                {datast.map((el) => (
                    <>
                        <div key={el.id} className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
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
                                         style={{display: "flex", flexDirection: "column", justifyContent: "left"}}>
                                        <span>{el.annotation}</span>
                                        <button className="" style={{marginTop: "1em", alignSelf: "start"}}
                                                onClick={() => {
                                                    setTransfer(el);
                                                    select('chapterlist');
                                                }}>Read
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
                <div className="my-pagination" style={{justifySelf: "self-end"}}>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" href="#"
                                                         onClick={() => {
                                                             setPage((page > 1) ? (page - 1) : (1));
                                                         }}>Previous</a>
                            </li>
                            {
                                pagestotal.map(el => (
                                    <>

                                        <li key={String(el) + "b"} className="page-item"><a className="page-link"
                                                                                            onClick={() => {
                                                                                                setPage(el);
                                                                                            }}>{el}</a></li>

                                    </>
                                ))

                            }
                            <li className="page-item"><a className="page-link" href="#"
                                                         onClick={setPage((page < pagestotal) ? (page + 1) : (page))}>Next</a>
                            </li>

                        </ul>
                    </nav>
                </div>
            </>

        );

    } else return null;
}

export default Top50Stories;