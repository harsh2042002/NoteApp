import React, { useContext, useEffect, useRef,useState} from "react";
import noteContext from "../context/notes/noteContax";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from 'react-router-dom';
import './searchbar.css'

const Notes = (props) => {
  //for modal(dialogue)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //delete popup
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  

  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, deleteNote } = context;
 
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login")
    }
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const refClose2 = useRef(null);
  const ref2 = useRef(null);


  const [note, setNote] = useState({
    eid:'',
    etitle: "",
    edescription: "",
    etag: "",
  });
  const [note2, setNote2] = useState({
    eid:'',
  });

  //updatnote function
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  };
  const handleUpdateNote = (e) => {
    console.log("updating Note..",note);
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully","info")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const DeleteNote = (currentNote) => {
    ref2.current.click();
    setNote2({id:currentNote._id})
  };
  const handleDeleteNote = (e) => {
    deleteNote(note2.id)
    refClose2.current.click();
    props.showAlert("Deleted Successfully","warning")
  };
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = notes.filter((el) => {
    //if no input the return the original
    if (inputText === '') {
        return el;
    }
    //return the item which contains the user input
    else {
        return el.title.toLowerCase().includes(inputText)
    }
})

  return (
    <>
    
      <div>
        <Button variant="outlined" onClick={handleClickOpen} ref={ref} sx={{display:'none'}}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Notes</DialogTitle>
          <DialogContent>
            <TextField
            defaultValue={note.etitle}
              autoFocus
              label="Title"
              margin="dense"
              name="etitle"
              id="etitle"
              type="text"
              onChange={onChange}
              minLength={2}
              required
            />
            <TextField
            defaultValue={note.edescription}
              autoFocus
              margin="dense"
              label="Description"
              name="edescription"
              id="edescription"
              type="text"
              multiline
              fullWidth
              rows={3}
              onChange={onChange}
              minLength={2}
              required
            />
            <TextField
            defaultValue={note.etag}
              autoFocus
              margin="dense"
              name="etag"
              id="etag"
              label="Tag"
              type="text"
              onChange={onChange}
             
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} ref={refClose}>Cancel</Button>
            <Button  onClick={handleUpdateNote}  disabled={note.etitle.length<3 || note.edescription.length<3}>Update Changes</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div> 
      <Button variant="outlined" onClick={handleClickOpen2} ref={ref2} sx={{display:'none'}}>
        Open alert dialog
      </Button>
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click on Confirm for delete this Note
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} ref={refClose2}>Cancel</Button>
          <Button onClick={handleDeleteNote} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    <div style={{display:'flex',flexDirection:'column'}}>
      <AddNote style={{display:'flex'}} showAlert={props.showAlert}></AddNote>
      <div style={{display:'flex',margin:'0 2rem'}} >
    <input name='searchbar' className='SearchBar' type="search" placeholder="Search" aria-label="Search"
      onChange={inputHandler} />
  </div>
      <div className="row my-4 mx-5" >
        <h1>Your Notes</h1>
      
       
       
        {filteredData.map((note) => {
          return (
           
            <Noteitem 
              key={note._id}
              updateNote={updateNote}
              DeleteNote={DeleteNote}
              showAlert={props.showAlert}
              note={note}
            ></Noteitem>
            
          );
        })}
        </div>
      </div>
    </>
  );
};

export default Notes;
