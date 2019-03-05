import React from "react";

export const TagsDisplay = ({ allTagsForEveryone, handleDelete }) => {
  if (!!allTagsForEveryone) {
    let tagsFromEveryone = Object.values(allTagsForEveryone)
      .reverse()
      .map(tag => {
        return (
          <div className="allTagsDiv" key={tag.id}>
            <p>
              Id: {tag.id} Name: <b>{tag.name}</b>{" "}
              <button onClick={e => handleDelete(e, tag.id)}>Delete tag</button>
            </p>
          </div>
        );
      });

    return <div>{tagsFromEveryone}</div>;
  } else {
    return null;
  }
};
