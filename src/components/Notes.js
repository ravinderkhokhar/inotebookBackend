import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitems from './Noteitems';
function Notes() {
    const context = useContext(noteContext);
    const {notes,setNotes} = context;
  return (
    <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((notes)=>{
            return <Noteitems key={notes._id} note={notes}/>
        })}
    </div>
  )
}

export default Notes

