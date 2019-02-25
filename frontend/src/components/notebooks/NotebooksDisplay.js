import React from "react";

export const NotebooksDisplay = ({ notebook }) => {
  if (!!notebook) {
    return <div>{notebook}</div>;
  } else {
    return null;
  }
};
