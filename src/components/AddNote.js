import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContax";
import "./addnote.css";
import TextField from "@mui/material/TextField";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Adding Note Successfully", "info");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container3">
      <h2 className="container ">Add Your Notes Here</h2>
      <form className="addnoteform">
        <div className="formInput">
          <label htmlFor="title" className="labelInput">
            Title
          </label>
          <TextField
            sx={{
              "& label.Mui-focused": {
                color: "#4C489D",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#4C489D",
              },
            }}
            variant="standard"
            value={note.title}
            name="title"
            type="text"
            id="title"
            label="Add title here"
            onChange={onChange}
            minLength={2}
            required
          />
        </div>

        <div className="formInput">
          <label htmlFor="description" className="labelInput">
            Description
          </label>
          <TextField
            sx={{
              "& label.Mui-focused": {
                color: "#4C489D",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#4C489D",
              },
            }}
            value={note.description}
            name="description"
            id="description"
            variant="standard"
            label="Add Description here"
            onChange={onChange}
            minLength={2}
            required
            multiline
          rows={2}
          ></TextField>
        </div>

        <div className="formInput">
          <label htmlFor="tag" className="labelInput">
            Tag
          </label>
          <TextField
            sx={{
              "& label.Mui-focused": {
                color: "#4C489D",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#4C489D",
              },
            }}
            variant="standard"
            value={note.tag}
            name="tag"
            id="tag"
            type="text"
            label="Add Tag here"
            onChange={onChange}
          />
        </div>
        <button
          className="addnoteButton"
          disabled={note.title.length < 3 || note.description.length < 3}
          variant="contained"
          onClick={handleAddNote}
        >
          AddNOte
        </button>
      </form>
    </div>
  );
};

export default AddNote;
