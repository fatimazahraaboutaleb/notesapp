import { useEffect, useState } from "react";
import axios from "axios";
import EditNote from "./editNote";
import CreateNote from "./createNote";
import "../styles/notelist1.css"

const Notelist = () => {
  useEffect(() => {
    console.log("hahahahahahha");
    getNotes();
  }, []);
  const [notes, setNotes] = useState([]);
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [createPopUpOpen, setCreatePopUpOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState("");
  
  
  const deleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      getNotes();
    } catch (err) {
      console.log(err);
    }
  };
  const getNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get("/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(resp.data);
      console.log(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  const openPopUp = (note) => {
    setSelectedNote(note);
    setPopUpOpen(true);
  };
  const closePopUp = () => {
    setPopUpOpen(false);
    setSelectedNote(null);
  };
  return (
    <div className="notelist">
      <div>
        <h1>Hello , {localStorage.getItem("first_name")} {localStorage.getItem("last_name")} !</h1>
        <button className="addnote" onClick={() => setCreatePopUpOpen(true)}>+ Add Note</button>
        <div className="All">
          {notes.map((note) => (
            <div className="note-card" key={note.id}>
              <h2>{note.title}</h2>
              <p className="content">{note.content}</p>
              <p><strong>Shared With:</strong> {note.shared_with.map((data) => `'${data.first_name} ${data.last_name}'`).join(", ")}</p>
              <p><strong></strong> {new Date(note.date).toISOString().split("T")[0]}</p>
              <div className="actions">
                <button onClick={() => openPopUp(note)}>Edit</button>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            </div>
          ))}
          
        </div>
      </div>
      {isPopUpOpen && (
        <EditNote
          selectedNote={selectedNote}
          closePopUp={closePopUp}
          getNotes={getNotes}
        />
      )}
      {
        createPopUpOpen && (
          <CreateNote
            setCreatePopUpOpen={setCreatePopUpOpen}
            getNotes={getNotes}
          />
        )
      }
    </div>
  );
};
export default Notelist;
