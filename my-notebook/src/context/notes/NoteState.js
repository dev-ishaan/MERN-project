import noteContext from './NoteContext'
import {useState} from 'react'

const NoteState = (props) =>{
const host = "http://localhost:5000"
const notesInitial = []

  const [notes, setnotes] = useState(notesInitial);

  // Get All Notes
  const getNotes = async () =>{
    // API calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MDdmNTZhOGRlYjk0NmUzOTI2MGYxIn0sImlhdCI6MTcxODY0ODY2Mn0.TuWniXCgmVt4FAPiI6sloSMI-VKAFlS-KqDTXQh1jo0"
      },
    });
    const json = await response.json();
     console.log(json)
     setnotes(json)
  }

  // Add a note
  const addNote = async (title, description, tag) =>{
    console.log("added a note")
    // API calls
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MDdmNTZhOGRlYjk0NmUzOTI2MGYxIn0sImlhdCI6MTcxODY0ODY2Mn0.TuWniXCgmVt4FAPiI6sloSMI-VKAFlS-KqDTXQh1jo0"
      },
      body: JSON.stringify({title, description, tag}),
    });
    const note = await response.json(); 
    setnotes(notes.concat(note))
  }

  // Delete a note
  const deleteNote = async (id) =>{
    // API calls
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MDdmNTZhOGRlYjk0NmUzOTI2MGYxIn0sImlhdCI6MTcxODY0ODY2Mn0.TuWniXCgmVt4FAPiI6sloSMI-VKAFlS-KqDTXQh1jo0"
      }
    });
    const json = await response.json(); 
    console.log(json)

    // Logic
    console.log("deleted the id " + id)
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setnotes(newNotes)
  }

  //Edit a note
  const editNote = async (id, title, description, tag) =>{
    // API calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MDdmNTZhOGRlYjk0NmUzOTI2MGYxIn0sImlhdCI6MTcxODY0ODY2Mn0.TuWniXCgmVt4FAPiI6sloSMI-VKAFlS-KqDTXQh1jo0"
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json(); 
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes)
  }
    return(
        <noteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState