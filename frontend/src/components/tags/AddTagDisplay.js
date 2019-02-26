import React from "react";

export const AddTagDisplay = props => {
  let { newTag, handleChange, handleSubmit } = props;

  return (
    <div className="newTagFormDiv">
      <form onSubmit={handleSubmit}>
        <h3>Create new tag</h3>
        <p>
          <b>Name</b>
        </p>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Tag name"
          value={newTag.name}
          onChange={handleChange}
          required
        />
        <br />
        <button className="CancelAddTagButton" type="reset">
          Cancel
        </button>
        <button className="addTagButton" type="submit">
          Done
        </button>
      </form>
    </div>
  );
};
