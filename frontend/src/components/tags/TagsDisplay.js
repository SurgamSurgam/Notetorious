import React from "react";

export const TagsDisplay = ({
  allTagsForEveryone,
  handleDelete,
  toggleEditing,
  handleEditChange,
  handleEditSubmit,
  editing,
  editUserInput,
}) => {
  let tagsFromEveryone;
  if (!!allTagsForEveryone) {
    tagsFromEveryone = Object.values(allTagsForEveryone).reverse().map(tag => {
        if (tag.id === editing) {
          return (
            <div className="allTagsDiv" key={tag.id}>
              <form onSubmit={e => {handleEditSubmit(e, tag.id)}}>
                <input
                  type="text"
                  onChange={handleEditChange}
                  value={editUserInput}
                />
                <button type="submit">Submit Edit</button>
                <button onClick={() => {toggleEditing(tag.id)}}>
                  Cancel
                </button>
              </form>
            </div>
          )
        } else {
          return (
            <li key={tag.id}>
              {tag.name}
              <button onClick={(e) => {handleDelete(e, tag.id)}}>
                Delete
              </button>
              <button onClick={() => {toggleEditing(tag.id)}}>
                Edit
              </button>
            </li>
          )
        }
    })
  }

  return (
    <div className="App">
      <ul>{tagsFromEveryone}</ul>
    </div>
  );
};
