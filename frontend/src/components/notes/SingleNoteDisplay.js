import React from "react";
import ReactQuill from "react-quill";
import Modal from "react-modal";
import Select from "react-select";

Modal.setAppElement("#root");

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
  toolbarOptions,
  showModal,
  handleCloseModal,
  handleOpenModal,
  handleSelectDropdownChange
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

  const options = [
    { value: "", label: "" },
    { value: "delete", label: "Delete note" },
    {
      value: "favorites",
      label: currentNoteObj.favorited ? "Remove shortcut" : "Add shortcut"
    },
    { value: "noteInfo", label: "Note info..." }
  ];

  if (!!currentNoteObj) {
    return (
      <div className="SingleNoteDisplayDiv">
        <div className="everythingAboveEditor">
          {/*Title Below*/}
          <input
            className="singleNoteInputTitleDiv"
            type="text"
            name="title"
            placeholder="Title"
            value={currentNoteObj.title}
            onChange={handleChangeTitle}
            required
          />
          {/*{isFavorited ? (
            <label htmlFor="favoriteCheckbox">

              <span
                className="favoritedHeartClear"
                onClick={handleAddToFavorite}
              >
                <i className="far fa-heart" />
              </span>
            </label>
          ) : (
            <label htmlFor="favoriteCheckbox">

              <span
                className="favoritedHeartSolid"
                onClick={handleAddToFavorite}
              >
                 <i className="fas fa-heart" />
              </span>
            </label>
          )}*/}
          {/*<button onClick={() => handleDelete(currentNoteObj.id)}>
            Delete note
          </button>*/}
          {/*menu above editor*/}

          <div className="menuAboveEditor">
            <Select
              onChange={handleSelectDropdownChange}
              options={options}
              placeholder={""}
            />
            {/*<span className="verticalEllipsis">
              <i className="fas fa-ellipsis-v" onClick={handleOpenModal} />
            </span>*/}
            {/*<button onClick={handleToggleViewNoteInfo}>
              View note info...
            </button>*/}
            <Modal isOpen={showModal} contentLabel="Minimal Modal Example">
              <button onClick={handleCloseModal}>Close Modal</button>
              <div>{toggleViewNoteInfo ? noteInfo : null} </div>
            </Modal>
          </div>
        </div>
        {/*Title and Editor Below*/}
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
