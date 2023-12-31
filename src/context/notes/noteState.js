import { useState } from "react";
import NoteContext from "../notes/noteContext";

const NoteState = (props) => {
    const mainNotes = [
        {
          "_id": "6501a0b30274138c6882c555",
          "user": "6500352d41497ab0a7a5fd18",
          "title": "My Title",
          "description": "Please always wake up early for some exersice.",
          "tag": "personal",
          "date": "2023-09-13T11:44:51.931Z",
          "__v": 0
        },
        {
          "_id": "6501a1b2fbbfd84fc1195e56",
          "user": "6500352d41497ab0a7a5fd18",
          "title": "My Title is updated",
          "description": "exersice Daily.",
          "tag": "note",
          "date": "2023-09-13T11:49:06.745Z",
          "__v": 0
        },
        {
          "_id": "65080c0084316620917f61ed",
          "user": "6500352d41497ab0a7a5fd18",
          "title": "New Note",
          "description": "Added new note.",
          "tag": "new note",
          "date": "2023-09-18T08:36:16.055Z",
          "__v": 0
        },
        {
          "_id": "65080c2e84316620917f4361ef",
          "user": "6500352d41497ab0a7a5fd18",
          "title": "Hotel Paradise",
          "description": "Created a brand new website for users.",
          "tag": "website",
          "date": "2023-09-18T08:37:02.731Z",
          "__v": 0
        },
        {
          "_id": "65080c2e84316620917f61ef4",
          "user": "6500352d41497ab0a7a5fd18",
          "title": "Hotel Paradise",
          "description": "Created a brand new website for users.",
          "tag": "website",
          "date": "2023-09-18T08:37:02.731Z",
          "__v": 0
        },
        
      ]

      const [notes, setNotes] = useState(mainNotes)

      // Add a note
      const addNote = (title, description, tag) => {
        //Todo: API Call
        const note = {
          "_id": "6501a1b2fbbfd84fc1195e56",
          "user": "6500352d41497ab0a7a5fd184",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-09-13T11:49:06.745Z",
          "__v": 0
        }
        setNotes(notes.concat(note))
      }
      
      // Delete a note
      const deleteNote = (id) => {
        //Todo: API Call
        console.log("Deleting a note with id" + id)
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
      }

      // Edit a note
      const editNote = (id, title, description, tag) => {
        
      }
      
    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;