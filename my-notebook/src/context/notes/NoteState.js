import noteContext from './NoteContext'
import {useState} from 'react'

const NoteState = (props) =>{

const notesInitial = [
    {
      "_id": "6674801849230f3f7196d1c312",
      "user": "66707f56a8deb946e39260f1",
      "title": "1st Note",
      "description": "Hello note 1",
      "tag": "personal",
      "date": "2024-06-20T19:16:40.600Z",
      "__v": 0
    },
    {
      "_id": "667b0aab88714721c268209e78",
      "user": "66707f56a8deb946e39260f1",
      "title": "2st Note",
      "description": "Hello note 2",
      "tag": "personal",
      "date": "2024-06-25T18:21:31.336Z",
      "__v": 0
    },
    {
      "_id": "667b0ab9881217721c268209e7b",
      "user": "66707f56a8deb946e39260f1",
      "title": "3rd Note",
      "description": "Hello note 3",
      "tag": "personal",
      "date": "2024-06-25T18:21:45.039Z",
      "__v": 0
    },
    {
      "_id": "667b0aab88772651c268209e78",
      "user": "66707f56a8deb946e39260f1",
      "title": "2st Note",
      "description": "Hello note 2",
      "tag": "personal",
      "date": "2024-06-25T18:21:31.336Z",
      "__v": 0
    },
    {
      "_id": "667b0aab8877211234c268209e78",
      "user": "66707f56a8deb946e39260f1",
      "title": "2st Note",
      "description": "Hello note 2",
      "tag": "personal",
      "date": "2024-06-25T18:21:31.336Z",
      "__v": 0
    },
    {
      "_id": "667b0aab887726561c268209e78",
      "user": "66707f56a8deb946e39260f1",
      "title": "2st Note",
      "description": "Hello note 2",
      "tag": "personal",
      "date": "2024-06-25T18:21:31.336Z",
      "__v": 0
    },
    {
      "_id": "667b0aab88772871c268209e78",
      "user": "66707f56a8deb946e39260f1",
      "title": "2st Note",
      "description": "Hello note 2",
      "tag": "personal",
      "date": "2024-06-25T18:21:31.336Z",
      "__v": 0
    }
  ]

  // Add a note
  const addNote = (title, description, tag) =>{
    console.log("added a note")
    const note = {
      "_id": "667b0aab8877282271c268209e78",
      "user": "66707f56a8deb946e39260f1",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-06-25T18:21:31.336Z",
      "__v": 0
    }
    setnotes(notes.concat(note))
  }

  // Delete a note
  const deleteNote = (id) =>{
    console.log("deleted the id " + id)
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setnotes(newNotes)
  }

  //Edit a note
  const editNote = (id, title, description, tag) =>{
    
  }

  const [notes, setnotes] = useState(notesInitial);
  
    return(
        <noteContext.Provider value={{notes, addNote, editNote, deleteNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState