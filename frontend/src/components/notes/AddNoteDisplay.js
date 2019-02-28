import React from "react";
import ReactQuill from "react-quill";

export const AddNoteDisplay = props => {
  let { newNote, handleNewNoteChange, handleSubmit, handleCancel } = props;
  return (
    <div className="newNoteFormDiv">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newNote.title}
        onChange={handleNewNoteChange}
        required
      />
      <ReactQuill
        name="body"
        value={newNote.body}
        onChange={handleNewNoteChange}
        placeholder="Start writing/editing"
      />
      <button className="CancelAddNoteButton" onClick={handleCancel}>
        Cancel
      </button>
      <button className="addNoteButton" onClick={handleSubmit}>
        Continue
      </button>
    </div>
  );
};
