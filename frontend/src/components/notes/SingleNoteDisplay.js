import React from "react";
import ReactQuill from "react-quill";

export const SingleNoteDisplay = ({
  currentNoteObj,
  handleChange,
  handleChangeTitle,
  handleToggleViewNoteInfo,
  toggleViewNoteInfo,
  discrepancyBtwnCurrentAndEdited,
  handleEditSubmit,
  handleEditCancel,
  handleAddToFavorite,
  isFavorited,
  handleDelete,
  toolbarOptions
}) => {
  let noteInfo = (
    <ul className="noteInfoUl">
      <li>Title: {currentNoteObj.title}</li>
      <li>Created at: {currentNoteObj.created_at}</li>
      <li>Updated at: {currentNoteObj.updated_at}</li>
      <li>Notebook Id: {currentNoteObj.notebook_id}</li>
      <li>Author Id: {currentNoteObj.author_id}</li>
      <li>Favorited: {String(currentNoteObj.favorited)}</li>
    </ul>
  );

  if (!!currentNoteObj) {
    return (
      <div className="SingleNoteDisplayDiv">
        <input
          className="singleNoteInputTitleDiv"
          type="text"
          name="title"
          placeholder="Title"
          value={currentNoteObj.title}
          onChange={handleChangeTitle}
          required
        />
        <div className="everythingAboveEditor">
          <button onClick={handleToggleViewNoteInfo}>View note info...</button>
          {isFavorited ? (
            <label htmlFor="favoriteCheckbox">
              {/*<input
                id="favoriteCheckbox"
                className="favoriteInput"
                type="checkbox"
                value={currentNoteObj.favorited}

              />*/}
              <span
                className="favoritedHeartClear"
                onClick={handleAddToFavorite}
              >
                Remove <i className="far fa-heart" />
              </span>
            </label>
          ) : (
            <label htmlFor="favoriteCheckbox">
              {/*<input
                id="favoriteCheckbox"
                className="favoriteInput"
                type="checkbox"
                value={currentNoteObj.favorited}

              />*/}
              <span
                className="favoritedHeartSolid"
                onClick={handleAddToFavorite}
              >
                Add <i className="fas fa-heart" />
              </span>
            </label>
          )}
          <button onClick={() => handleDelete(currentNoteObj.id)}>
            Delete note
          </button>
        </div>
        {toggleViewNoteInfo ? noteInfo : null}{" "}
        <ReactQuill
          value={currentNoteObj.body}
          onChange={handleChange}
          placeholder="Start writing/editing"
          modules={{ toolbar: toolbarOptions }}
          theme="snow"
        />
        {discrepancyBtwnCurrentAndEdited ? (
          <div className="submitEditDiv">
            <button onClick={handleEditCancel}>Cancel</button>
            <button onClick={handleEditSubmit}>Submit Edit</button>
            <br />
            <br />
          </div>
        ) : null}
      </div>
    );
  } else {
    return null;
  }
};
