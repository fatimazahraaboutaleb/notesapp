import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/editNote.css"
import UserSelect from "./userselect";

const EditNote = ({ selectedNote, closePopUp, getNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");
      setContent(selectedNote.content || "");
      setSelectedUsers(selectedNote.shared_with || []);
    }
  }, [selectedNote]);
  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const id = selectedNote.id;
      const res = await axios.put(
        `/notes/${id}`,
        {
          title,
          content,
          shared_with: selectedUsers.map((user) => user.value),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      getNotes();
      closePopUp();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="popup">
      <form action="">
        <h1>Edit Note</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <UserSelect selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
        <button onClick={editNote}>Edit</button>
      </form>
      <button className="cancel" onClick={closePopUp}>Cancel</button>
    </div>
  );
};
export default EditNote;
