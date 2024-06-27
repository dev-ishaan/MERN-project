import React, {useContext} from 'react'
import noteContext from "../context/notes/NoteContext"

const NoteItem = (props) => {
    const {notes} = props
    const context = useContext(noteContext)
    const {deleteNote} = context

  return (
    <div className='col-md-3 my-3'>
      <div className="card">
        <div className="card-body">
            <div className="d-flex justify-content-between">
                <h5 className="card-title">{notes.title}</h5>
                <div className="icons">
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(notes._id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2"></i>
                </div>
            </div>
            <p className="card-text">{notes.description}</p>
        </div>
        </div>
    </div>
  )
}

export default NoteItem
