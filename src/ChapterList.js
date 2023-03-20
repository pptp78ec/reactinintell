import React, {useState, useEffect} from "react";
import axios from "axios";

function ChaptersList({select, selectedmenu, transfer, setTransfer, currentuser, loggedstatus, config, server}) {
    let [datach, setDatach] = useState(null);
    const [author, setAuthor] = useState(null);
    useEffect(() => {
        if (selectedmenu === "chapterlist") {
            let apiUrl = server + '/GetChapters/' + transfer.id;
            axios.get(apiUrl).then((resp) => {
                setDatach(resp.data);
            });
            axios.get(server + '/GetAuthor/' + transfer.userId).then(resp=>setAuthor(resp.data));
        }
    }, [selectedmenu]);
    let addChapater = function (logstate, transfer) {
        if (logstate === true && transfer.userId === currentuser.id) {
            return (
                <>
                    <a className="btn btn-primary" onClick={() => {
                        setTransfer(transfer);
                        select("addchapterpage");
                    }}>Add chapter</a>
                    <a className="btn btn-primary" onClick={() => {
                        setTransfer(transfer);
                        select("editstorypage");
                    }}>Edit story</a>
                </>
            );
        } else return null;
    }
    let Endorse = (e)=>{
        e.preventDefault();
        axios.post(server + "/Endorse", transfer, config).then(alert("Thank you for your opinion!"));
    }
    let Hate = (e)=>{
        e.preventDefault();
        axios.post(server +"/Hate", transfer, config).then(alert("Thank you for your opinion!"));
    }
    const hateEndorseRender = (transfer)=>{
        if(transfer!==null, loggedstatus===true){
            return(
                <>
                    <div>
                        <button className="btn btn-success" type="submit" onClick={Endorse}>I like it!</button>
                        <button className="btn btn-danger" type="submit" onClick={Hate}>I hate it!</button>
                    </div>
                </>
            );
        }
    }
    if (selectedmenu === "chapterlist" && datach !== null && author!==null) {
        return (
            <>
                <h3>{transfer.name} by <a onClick={()=>{setTransfer(author); select("userprofile")}} href="#">{author.name}</a>. Chapters:</h3>
                {hateEndorseRender()}
                <div className="list-group">
                    {datach.map(x => (
                        <>
                            <button key={x.id} type="button" className="list-group-item list-group-item-action"
                                    onClick={() => {
                                        setTransfer(x);
                                        select("readchapter");
                                    }}>{x.title}</button>
                        </>
                    ))}
                </div>
                {addChapater(loggedstatus, transfer)}

            </>
        );
    } else return null;
}

export default ChaptersList;