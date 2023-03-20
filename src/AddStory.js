import React, {useState} from "react";
import axios from "axios";



function AddStory({select,selectedmenu, currentuser, server}){
    let [story, setStory] = useState(null);
    const submit = e => {
        e.preventDefault();
        story.id = "";
        story.userId = currentuser.id;
        axios.post(server +`/AddNewFiction`, story).then(resp => {
            select(null);
        });

    }
    const onChangeHandler = (event: HTMLInputElement) => {
        const {name, value} = event
        setStory((prev) => {
            return {...prev, [name]: value}
        })
    }
    if(selectedmenu === "addstorypage"){
        return(
            <>
                <div>
                    <form onSubmit={submit}>
                        <input type="text" className="hidden" name="UserId"
                               value={currentuser.id} onLoad={(e)=>onChangeHandler(e.target)}/>
                        <div className="mb-3">
                            <label htmlFor="sname" className="form-label">Story name</label>
                            <input type="text" className="form-control" id="sname" name="Name" onChange={(e) => onChangeHandler(e.target)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="annotat" className="form-label">Annotation</label>
                            <textarea rows="3" className="form-control" name="Annotation" id="annotat"
                                      required onChange={(e) => onChangeHandler(e.target)}></textarea>
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

export default AddStory;