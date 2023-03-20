import React, {useEffect, useReducer, useState} from "react";
import axios from "axios";



function ReadChapter({selectedmenu, transfer, currentuser, setTransfer, loggedstatus, select, config, server}) {
    const [comments, setComments] = useState(null);
    const [authors, setAuthors] = useState(null);
    const [fiction, setFiction] = useState(null);
    let [newcomment, setNewComment] = useState(null);
    const [red, forceUpdate] = useReducer(x => x + 1, 0);//костыль для ре-рендера

    let savedTransfer;
    useEffect(() => {
        if (selectedmenu === "readchapter") {
            axios.get(server + `/GetCommentsForChapter/` + transfer.id, config).then((resp) => {
                setComments(resp.data);
            });
            axios.get(server + `/GetAuthorsAll/`, config).then((resp) => {
                setAuthors(resp.data);
            });
            axios.get(server + `/GetFictionById/` + transfer.fiction_id, config).then(resp => {
                setFiction(resp.data);
            });
        }


    }, [selectedmenu, red]);

    const onChangeHandler = (event: HTMLInputElement) => {
        const {name, value} = event
        setNewComment((prev) => {
            return {...prev, [name]: value}
        })
    }
    const editopts = function (transfer) {
         if (loggedstatus === true && currentuser !== null && fiction.userId === currentuser.id) {

            return (
                <>
                    <div>
                        <a className="btn btn-primary" onClick={() => {
                            setTransfer(transfer);
                            select("editchapterpage");
                        }}>Edit Chapter</a>
                    </div>
                </>
            );
        } else return null;
    }
    const submitComment = (e)=>{
        e.preventDefault();
        newcomment["UserId"] = currentuser.id;
        newcomment["FictionId"] = fiction.id;
        newcomment["ChapterId"] = transfer.id;
        newcomment["Id"] = "";
        axios.post(server + `/AddNewCommentary/`, newcomment, config);
        setTransfer(transfer);
        forceUpdate();
    }

    const comment = function (){
        if(loggedstatus === true && currentuser !==null){
            return(
                <>
                    <form className="d-flex flex-row add-comment-section mt-4 mb-4" onSubmit={submitComment}>
                        <input type="text" name="FictionId" value="@Model.Chapter.Fiction_id" className="hidden" id="FictionId" onChange={(e) => onChangeHandler(e.target)}/>
                        <input type="text" name="ChapterId" value="@Model.Chapter.Id" className="hidden"
                               id="ChapterId" onChange={(e) => onChangeHandler(e.target)}/>
                        <input type="text" className="form-control mr-3" placeholder="Add comment" name="Contents"
                               id="Contents" onChange={(e) => onChangeHandler(e.target)}/>
                            <button id="subcomm" className="btn btn-primary">Comment</button>
                    </form>
                </>
            );
        }
    }

    if (selectedmenu === "readchapter" && transfer !== null && comments !== null && authors !== null && fiction !== null) {
        savedTransfer = transfer;
        return (
            <>
                <div key={transfer.id + transfer.fiction_id}>
                    <div className="header" style={{textAlign: "center"}}>
                        <h3>{transfer.title}</h3>
                    </div>
                    <div style={{margin: "10% auto auto auto"}}>
                    <span>
                        {transfer.text}
                    </span>
                    </div>
                </div>
                <div style={{marginTop: "2em"}}>
                    <div style={{}}><h4 style={{display: "block"}}>Commentaries for chapter</h4></div>
                    <div>
                        <div className="container mt-5 mb-5" style={{width: "inherit"}}>
                            <div className="d-flex justify-content-center row">
                                <div className="d-flex flex-column col-md-8">
                                    <div className="comment-bottom bg-white p-2 px-4">
                                        {
                                            comment()
                                        }
                                        {
                                            comments.map(item => (
                                                <>
                                                    <div key={item.id} className="commented-section mt-2">
                                                        <div
                                                            className="d-flex flex-row align-items-center commented-user">
                                                            <h5 className="mr-2">{authors.find(x => x.id === item.userId).name}</h5>
                                                            <span
                                                                className="dot mb-1 m-1"></span><span
                                                            className="mb-1 ml-2">{item.createdAt}</span>
                                                        </div>
                                                        <div className="comment-text-sm"><span>{item.contents}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {editopts(transfer)}
            </>
        );
    } else return null;
}

export default ReadChapter;