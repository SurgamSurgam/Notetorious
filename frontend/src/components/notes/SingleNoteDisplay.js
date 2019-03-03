import React from "react";
import ReactQuill from "react-quill";

export const SingleNoteDisplay = ({ currentNoteObj, handleChange, handleChangeTitle, handleToggleViewNoteInfo, toggleViewNoteInfo, discrepancyBtwnCurrentAndEdited, handleEditSubmit, handleEditCancel, handleAddToFavorite, isFavorited }) => {
  let noteInfo =
    (<ul>
      <li>Title: {currentNoteObj.title}</li>
      <li>Created at: {currentNoteObj.created_at}</li>
      <li>Updated at: {currentNoteObj.updated_at}</li>
      <li>Notebook Id: {currentNoteObj.notebook_id}</li>
      <li>Author Id: {currentNoteObj.author_id}</li>
      <li>Favorited: {String(currentNoteObj.favorited)}</li>
    </ul>)

  if (!!currentNoteObj) {
    return (
      <div>
        <button onClick={handleToggleViewNoteInfo}>View note info...</button>
        {toggleViewNoteInfo ? (noteInfo):(null)}
        {' '}

        {isFavorited? (  <label htmlFor="favoriteCheckbox">
            <input id='favoriteCheckbox' className= 'favoriteInput' type="checkbox" value={currentNoteObj.favorited} onClick={handleAddToFavorite}/>
            <span>Remove from Favorites</span>
          </label>):(  <label htmlFor="favoriteCheckbox">
              <input id='favoriteCheckbox' className= 'favoriteInput' type="checkbox" value={currentNoteObj.favorited} onClick={handleAddToFavorite}/>
              <span>Add to Favorites</span>
            </label>)}

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={currentNoteObj.title}
          onChange={handleChangeTitle}
          required
        />
        <ReactQuill
          value={currentNoteObj.body}
          onChange={handleChange}
          placeholder="Start writing/editing"
        />
        { discrepancyBtwnCurrentAndEdited ? (
          <div className='submitEditDiv'>
            <button onClick={handleEditCancel}>Cancel</button>
            <button onClick={handleEditSubmit}>Submit Edit</button>
            <br/>
            <br/>
          </div>
          ): (null)
        }
      </div>
    );
  } else {
    return null;
  }
};
