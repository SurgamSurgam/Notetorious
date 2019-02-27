import React from "react";

export const NotesDisplay = ({ notes }) => {
  if (!!notes) {
    return <div>{notes}</div>;
  } else {
    return null;
  }
};
