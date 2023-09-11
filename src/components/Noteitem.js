import { React,  } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import IconButton from "@mui/material/IconButton";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Tooltip from '@mui/material/Tooltip';

const Noteitem = (props) => {
  // const context = useContext(noteContext);
  // const { deleteNote } = context;

  const { note, updateNote , DeleteNote } = props;

  return (
    <>
     <Card sx={{ maxWidth: "15rem",margin:'1rem' }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {note.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize='1.1rem' >
          {note.description}
          </Typography>
          <Typography variant="body2" color="text.secondary"
          sx={{border:'1px solid #6A679E',borderRadius:'30px',padding:'0.1rem 3%',margin:'0.5rem -0.1rem',width:'60%',display:'flex',}}>
            <LocalOfferIcon fontSize="small" sx={{margin:'0 5%',}}></LocalOfferIcon>
          {note.tag}
          </Typography>
        </CardContent>
        <Tooltip title="Delete" arrow>
        <IconButton
        onClick={() => {
          DeleteNote(note);
        }}
            // sx={{ marginRight: "1rem" }}
            // onClick={() => {
            //   deleteNote(note._id);
            //   props.showAlert("Deleted Successfully", "warning");
            // }}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </IconButton>
          </Tooltip>
        <Tooltip title="Edit" arrow>

          <IconButton
            onClick={() => {
              updateNote(note);
            }} sx={{margin:'0 3%'}}
          >
            <EditNoteIcon></EditNoteIcon>
          </IconButton>
          </Tooltip>

      </CardActionArea>
    </Card>
    </>
  );
};

export default Noteitem;
