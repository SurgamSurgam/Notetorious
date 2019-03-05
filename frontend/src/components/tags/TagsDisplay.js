import React from "react";

export const TagsDisplay = ({ tagsFromEveryone }) => {
  if (!!tagsFromEveryone) {
    return <div>{tagsFromEveryone}</div>;
  } else {
    return null;
  }
};
