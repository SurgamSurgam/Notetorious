import React from "react";

export const SingleNoteDisplay = ({ firstNote }) => {

  if (!!firstNote) {
    return <div>{firstNote.title}  {firstNote.body}</div>;
  } else {
    return null;
  }
};
