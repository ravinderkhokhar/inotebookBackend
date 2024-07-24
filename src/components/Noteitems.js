import React from 'react'

function Noteitems(props) {
  const  {note} = props;
  return (
    <div className='col-md-3'>      
        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex align-items-baseline">
                    <div className="mr-auto float-left"><h5 className="card-title">{note.title}</h5></div>
                    <div className="d-flex align-items-end float-right"><i className="fa-solid fa-trash-can mx-2"></i></div>
                    <div className="d-flex align-items-end float-right"><i className="fa-solid fa-pen-to-square mx-2"></i></div>
                </div>                
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    </div>
  )
}

export default Noteitems
