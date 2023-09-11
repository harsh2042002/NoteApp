import NoteContext from "./noteContax";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:3300";
  const notesInitials = [];
  const [notes, setNotes] = useState(notesInitials);

  //Get and fetch all notes 
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
      });
      const json =await response.json()
      console.log(json)
      setNotes(json)
   
  };

  //add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}),
      }
    );
    const note =await response.json();
    setNotes(notes.concat(note));
    // console.log(json)

    // console.log("adding  new note");
    // const note = json;
  };


  //Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}),
      }
    );
    const json = await response.json();
    console.log(json)
  
    let newNotes = JSON.parse(JSON.stringify(notes))
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
  }
  setNotes(newNotes);
};
//Delete a note
const deleteNote = async (id) => {
  const response = await fetch(`${host}/api/notes/deletenote/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    }
  );
  const json = response.json();
  console.log(json);

  console.log("Deleting a note with id " + id);
  const newNotes = notes.filter((note) => {
    return note._id !== id;
  });
  setNotes(newNotes);
};

return (
  <NoteContext.Provider
    value={{ notes, setNotes, addNote, editNote, deleteNote,getNotes }}
  >
    {props.children}
  </NoteContext.Provider>
);
}

export default NoteState;
