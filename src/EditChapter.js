import React, {useState} from "react";
import axios from "axios";


function EditChapter({selectedmenu, select, transfer, server}) {
    let [chapter, setChapter] = useState(transfer);

    const submit = e => {
        e.preventDefault();
        axios.post(server + `/EditChapter`, chapter).then(resp => {
            select(null);
        });

    }
    const onChangeHandler = (event: HTMLInputElement) => {
        const {name, value} = event
        // setChapter((prev) => {
        //     return {...prev, [name]: value}
        // })
        chapter[name] = value;
    }
    if (selectedmenu === "editchapterpage") {
        chapter = {
            Id: transfer.id,
            Text: transfer.text,
            Title: transfer.title,
            Fiction_id: transfer.fiction_id,
            DeletedFlag: transfer.deletedFlag,
            DraftFlag: transfer.draftFlag

        }
        return (
            <>
                <div>
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label htmlFor="sname" className="form-label">Chapter title</label>
                            <input type="text" defaultValue={transfer.title} className="form-control" id="sname" name="Title"
                                   onChange={(e) => onChangeHandler(e.target)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="annotat" className="form-label">Text</label>
                            <textarea rows="10" defaultValue={transfer.text} className="form-control" name="Text" id="annotat"
                                      required onChange={(e) => onChangeHandler(e.target)}></textarea>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" defaultChecked={transfer.draftFlag} className="form-check-input"
                                   id="exampleCheck1" name="DraftFlag" onChange={(e) => onChangeHandler(e.target)}/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Save as draft</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </>
        );
    } else return null;


}

export default EditChapter;