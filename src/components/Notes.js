import React, { useContext } from 'react'
import notesContext from "../context/notes/noteContext";
import NoteItem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(notesContext);
  const { notes, addNote } = context;
  return (
    <>
      <AddNote/>
      <div>
        <div className="row my-3">
          <h3>Your Notes.</h3>
          {notes.map((note) => {
            return <NoteItem key={note._id} note={note} />;
          })}
        </div>
      </div>
    </>
  )
}

export default Notes
