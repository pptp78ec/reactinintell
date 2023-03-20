import React, {useEffect, useState} from "react";
import axios from "axios";

function AuthorsList({selectedmenu, select, setTransfer, transfer, server}) {
    const [authors, setAuthors] = useState(null);
    useEffect(() => {
        if (selectedmenu === "authorslist") {
            axios.get(server + '/GetAuthorsAll/').then(resp => setAuthors(resp.data));
        }
    }, [selectedmenu]);
    if (selectedmenu === "authorslist" && authors!==null) {
        return (
            <>
                <div className="content">
                    <div className="list-group">
                        {
                            authors.map((el)=>(
                                    <>
                                        <a key={el.id + el.name} href="#"
                                           className="list-group-item list-group-item-action"
                                        onClick={()=> {setTransfer(el); select("userprofile")}}>{el.name}
                                        </a>
                                    </>
                                )
                            )
                        }

                    </div>
                </div>
            </>
        );
    } else return null;
}

export default AuthorsList;