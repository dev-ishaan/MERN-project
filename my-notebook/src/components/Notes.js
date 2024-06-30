import React, {useContext, useEffect, useRef, useState} from "react";
import noteContext from "../context/notes/NoteContext"
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";

const Notes = () => {
    const context = useContext(noteContext)
    const {notes, getNotes, editNote} = context
    useEffect(() => {
      getNotes()
      // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: ""});

    const ref = useRef(null)
    const refClose= useRef(null)
    const updateNotes = (currentNote) =>{
      ref.current.click()
      setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    const handleClick = (e)=>{
      console.log("updating note", note)
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click()
  }

  const onChange= (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
    <Addnote/>
    
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
                <form className='my-4'>
                  <div className="form-group">
                    <label className="my-1" htmlFor="title">Enter Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                  </div>
                  <div className="form-group my-3">
                    <label className="my-1" htmlFor="description">Enter Description</label>
                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required/>
                  </div>
                  <div className="form-group my-3">
                    <label className="my-1" htmlFor="tag">Enter Tag</label>
                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange}/>
                  </div>
                </form>
            </div>

            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
    <div className="row">

      <h3 className="text-center my-4">Your Notes</h3>
      <div className="container text-center">
      {notes.length===0 && 'No notes to display'}
      </div>
      {notes.map((notes) => {
        // MongoDB fetch the id in form of "._id"
        return <NoteItem key = {notes._id} updateNotes={updateNotes} notes={notes}/>
      })}
    </div>
    </>
  );
};

export default Notes;
