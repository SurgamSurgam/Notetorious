import React from "react";
import ReactQuill from "react-quill";

export const SingleNoteDisplay = ({ currentNoteObj, handleChange }) => {
  if (!!currentNoteObj) {
    return (
      <div>
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
