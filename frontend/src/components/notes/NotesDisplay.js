import React from "react";

export const NotesDisplay = ({ notes }) => {
  if (!!notes) {
    return <div className='allNotesDivWrapper'>{notes}</div>;
  } else {
    return null;
  }
};
