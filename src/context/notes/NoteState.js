import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) =>{
    const s1 = {
        "name" : "Ravinder",
        "class" : "5b"
    }
    
  const [state, setState] = useState(s1);
   const update = ()=>{
        setTimeout(()=>{
            setState({
                "name" : "gurnoor",
                "class" : "9b"
            })
        },1000);
    }
    return(
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;