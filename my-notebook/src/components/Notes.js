import React, {useContext} from "react";
import noteContext from "../context/notes/NoteContext"
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";

const Notes = () => {
    const context = useContext(noteContext)
    const {notes, addNote} = context
  return (
    <>
    <Addnote/>
    <div className="row">
      <h3 className="text-center my-4">Your Notes</h3>
      {notes.map((notes) => {
        // MongoDB fetch the id in for of "._id"
        return <NoteItem key = {notes._id} notes={notes}/>
      })}
    </div>
    </>
  );
};

export default Notes;
