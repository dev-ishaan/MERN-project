import noteContext from './NoteContext'
import {useState} from 'react'

const NoteState = (props) =>{

const notesInitial = [
    {
      "_id": "66748018490f3f7196d1c312",
      "user": "66707f56a8deb946e39260f1",
      "title": "1st Note",
      "description": "Hello note 1",
      "tag": "personal",
      "date": "2024-06-20T19:16:40.600Z",
      "__v": 0
    },
    {
      "_id": "667b0aab887721c268209e78",
      "user": "66707f56a8deb946e39260f1",
      "title": "2st Note",
      "description": "Hello note 2",
      "tag": "personal",
      "date": "2024-06-25T18:21:31.336Z",
      "__v": 0
    },
    {
      "_id": "667b0ab9887721c268209e7b",
      "user": "66707f56a8deb946e39260f1",
      "title": "3rd Note",
      "description": "Hello note 3",
      "tag": "personal",
      "date": "2024-06-25T18:21:45.039Z",
      "__v": 0
    },
    {
      "_id": "667b0aab887721c268209e78",
      "user": "66707f56a8deb946e39260f1",
      "title": "2st Note",
      "description": "Hello note 2",
      "tag": "personal",
      "date": "2024-06-25T18:21:31.336Z",
      "__v": 0
    },
    {
      "_id": "667b0aab887721c268209e78",
      "user": "66707f56a8deb946e39260f1",
      "title": "2st Note",
      "description": "Hello note 2",
      "tag": "personal",
      "date": "2024-06-25T18:21:31.336Z",
      "__v": 0
    },
    {
      "_id": "667b0aab887721c268209e78",
      "user": "66707f56a8deb946e39260f1",
      "title": "2st Note",
      "description": "Hello note 2",
      "tag": "personal",
      "date": "2024-06-25T18:21:31.336Z",
      "__v": 0
    },
    {
      "_id": "667b0aab887721c268209e78",
      "user": "66707f56a8deb946e39260f1",
      "title": "2st Note",
      "description": "Hello note 2",
      "tag": "personal",
      "date": "2024-06-25T18:21:31.336Z",
      "__v": 0
    }
  ]

  const [notes, setnotes] = useState(notesInitial);
  
    return(
        <noteContext.Provider value={{notes, setnotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState