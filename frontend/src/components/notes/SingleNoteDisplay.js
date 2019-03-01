import React from "react";
import ReactQuill from "react-quill";

export const SingleNoteDisplay = ({ currentNoteObj, handleChange, handleChangeTitle, handleToggleViewNoteInfo, toggleViewNoteInfo }) => {
  let noteInfo =
    (<ul>
      <li>Title: {currentNoteObj.title}</li>
      <li>Created at: {currentNoteObj.created_at}</li>
      <li>Updated at: {currentNoteObj.updated_at}</li>
      <li>Notebook Id: {currentNoteObj.notebook_id}</li>
      <li>Author Id: {currentNoteObj.author_id}</li>
      <li>Favorited: {String(currentNoteObj.favorited)}</li>
    </ul>)

  if (!!currentNoteObj) {
    return (
      <div>
        <button onClick={handleToggleViewNoteInfo}>View note info...</button>
        {toggleViewNoteInfo ? (noteInfo):(null)}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={currentNoteObj.title}
          onChange={handleChangeTitle}
          required
        />
        <ReactQuill
          value={currentNoteObj.body}
          onChange={handleChange}
          placeholder="Start writing/editing"
        />
      </div>
    );
  } else {
    return null;
  }
};
