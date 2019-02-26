import React from "react";

export const TagsDisplay = ({ tags }) => {
  if (!!tags) {
    return <div>{tags}</div>;
  } else {
    return null;
  }
};
