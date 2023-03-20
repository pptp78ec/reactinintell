import React, {useState} from "react";
import axios from "axios";

function AddChapter({select, selectedmenu,currentuser, transfer, setTransfer, server}){
    const [chapter, setChapter] = useState(null);

    const submit = e => {
        chapter.Fiction_id = transfer.id;
        chapter.id = "";
        e.preventDefault();
        axios.post(server + `/AddNewChapter`, chapter).then(resp => {
            select(null);
        });

    }
    const onChangeHandler = (event: HTMLInputElement) => {
        const {name, value} = event
        setChapter((prev) => {
            return {...prev, [name]: value}
        })
    }
    if(selectedmenu==="addchapterpage"){
        return (
            <>
                <div>
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label htmlFor="sname" className="form-label">Chapter title</label>
                            <input type="text" className="form-control" id="sname" name="Title"
                                   onChange={(e) => onChangeHandler(e.target)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="annotat" className="form-label">Text</label>
                            <textarea rows="10" className="form-control" name="Text" id="annotat" required onChange={(e) => onChangeHandler(e.target)}></textarea>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" name="DraftFlag" onChange={(e) => onChangeHandler(e.target)}/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Save as draft</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </>
        );
    }
    else return null;


}

export default AddChapter;