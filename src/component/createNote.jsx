import { useState } from "react";
import "../styles/createnote.css";
import axios from "axios";
import UserSelect from "./userselect";
const CreateNote = ({setCreatePopUpOpen, getNotes }) => {
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const createNote = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                "/notes",
                {
                    title: noteTitle,
                    content: noteContent,
                    shared_with: selectedUsers.map((user) => user.value),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res);
            setNoteTitle("");
            setNoteContent("");
            setSelectedUsers([]);
            setCreatePopUpOpen(false);
            getNotes();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="create">
            <form action="" className="create-form">
                <p>New Note</p>
                <input
                    type="text"
                    id="title"
                    value={noteTitle}
                    placeholder="title"
                    onChange={(e) => {
                        setNoteTitle(e.target.value);
                    }}
                />
                <input
                    type="text"
                    id="content"
                    value={noteContent}
                    placeholder="content"
                    onChange={(e) => {
                        setNoteContent(e.target.value);
                    }}
                />
                <UserSelect selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />

                <button className="createbtn" onClick={createNote}>Create Note</button>
                <button className="cancel" onClick={() => { setCreatePopUpOpen(false) }}>Cancel</button>
            </form>
        </div>
    )
}
export default CreateNote;