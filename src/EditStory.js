import React, {useState} from "react";
import axios from "axios";

function EditStory({select, selectedmenu, transfer, config, server}) {

    let [story, setStory] = new useState(null);

    const submit = e => {
        e.preventDefault();
        axios.post(server + `/EditFiction`, story, config).then(resp => {
            select(null);
        });

    }
    const onChangeHandler = (event: HTMLInputElement) => {

        const {name, value} = event;

        // setStory((prev) => {
        //     return {...prev, [name]: value}
        // });
       story[name] = value;
    }

    if (selectedmenu === "editstorypage") {
        story = {
            Id: transfer.id,
            Name: transfer.name,
            UserId: transfer.userId,
            IsDeleted : transfer.isDeleted,
            Rating: transfer.rating,
            Annotation: transfer.annotation,
            DraftFlag: false
        };
        return (
            <>
                <div>
                    <form onSubmit={submit}>

                        <div className="mb-3">
                            <label htmlFor="sname" className="form-label">Story name</label>
                            <input type="text"   defaultValue={story.Name} className="form-control" id="sname" name="Name"
                                   onInput={(e) => onChangeHandler(e.target)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="annotat" className="form-label">Annotation</label>
                            <textarea rows="3" defaultValue={story.Annotation} className="form-control" name="Annotation"
                                      id="annotat"
                                      required onChange={(e) => onChangeHandler(e.target)}></textarea>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" defaultChecked={story.DraftFlag} className="form-check-input"
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

export default EditStory;