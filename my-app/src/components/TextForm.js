import React, { useState } from "react";

export default function TextForm(props) {

    const handleUpClick=()=>{
        let newtext=text.toUpperCase();
        setText(newtext);
    }

    const handleOnChange=(event)=>{
        setText(event.target.value);
    }

    const[text,setText]=useState('Enter State here');
    return (
        <div>
            <h1>{props.heading}</h1>
            <div className="mb-3">
                <textarea className="form-control" id="myBox" rows="8" value={text} onChange={handleOnChange}></textarea>
            </div>
            <button className="btn btn-primary" onClick={handleUpClick}>Convert to Uppercase</button>
        </div>
    );
}
