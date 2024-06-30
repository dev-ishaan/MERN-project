import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/NoteContext"

const Addnote = () => {
    const context = useContext(noteContext)
    const {addNote} = context

    const [note, setNote] = useState({title: "", description: "", tag: ""});

    const handleClick = (e)=>{
        // To avoid page reload
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: ""})
    }

    const onChange= (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div className='container'>
      <h3 className='text-center my-4'>Add Notes</h3>
      <div className="container">
      <form className='my-4'>
          <div className="form-group">
            <label className="my-1" htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter title of minimum length 3" onChange={onChange} minLength={5} required value={note.title}/>
          </div>
          <div className="form-group my-3">
            <label className="my-1" htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" name="description" placeholder="Enter description of minimum length 5" onChange={onChange} minLength={5} required value={note.description}/>
          </div>
          <div className="form-group my-3">
            <label className="my-1" htmlFor="tag">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter Tag" onChange={onChange} value={note.tag}/>
          </div>
          <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add</button>
      </form>
      </div>
    </div>
  )
}

export default Addnote
