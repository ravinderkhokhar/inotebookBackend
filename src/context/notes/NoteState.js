import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) =>{
    // const s1 = {
    //     "name" : "Ravinder",
    //     "class" : "5b"
    // }    
    // const [state, setState] = useState(s1);
    // const update = ()=>{
    //     setTimeout(()=>{
    //         setState({
    //             "name" : "gurnoor",
    //             "class" : "9b"
    //         })
    //     },1000);
    // }

    const notesInitial = [
        {
          "_id": "66867770d3a33f0e7dcdc2ad",
          "user": "668508e63b6a2fdacd2d4351",
          "title": "My Title",
          "description": "My description",
          "tag": "Personal",
          "date": "2024-07-04T10:20:32.050Z",
          "__v": 0
        },
        {
          "_id": "668b83ea79542ba18ed65d32",
          "user": "668508e63b6a2fdacd2d4351",
          "title": "My Title",
          "description": "My description",
          "tag": "Personal",
          "date": "2024-07-08T06:15:06.434Z",
          "__v": 0
        },
        {
          "_id": "668b83ea79542ba18ed65d34",
          "user": "668508e63b6a2fdacd2d4351",
          "title": "My Title",
          "description": "My description",
          "tag": "Personal",
          "date": "2024-07-08T06:15:06.774Z",
          "__v": 0
        },
        {
          "_id": "668b83eb79542ba18ed65d36",
          "user": "668508e63b6a2fdacd2d4351",
          "title": "My Title",
          "description": "My description",
          "tag": "Personal",
          "date": "2024-07-08T06:15:07.027Z",
          "__v": 0
        },
        {
          "_id": "668b83ea79542ba18ed65d32q",
          "user": "668508e63b6a2fdacd2d4351",
          "title": "My Title",
          "description": "My description",
          "tag": "Personal",
          "date": "2024-07-08T06:15:06.434Z",
          "__v": 0
        },
        {
          "_id": "668b83ea79542bafd18ed65d34",
          "user": "668508e63b6a2fdacd2d4351",
          "title": "My Title",
          "description": "My description",
          "tag": "Personal",
          "date": "2024-07-08T06:15:06.774Z",
          "__v": 0
        },
        {
          "_id": "668b83eb79542baf18ed65d36",
          "user": "668508e63b6a2fdacd2d4351",
          "title": "My Title",
          "description": "My description",
          "tag": "Personal",
          "date": "2024-07-08T06:15:07.027Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial);
    return(
        // <NoteContext.Provider value={{state, update}}>
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;